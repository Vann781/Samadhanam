/**
 * EXAMPLE: Updated Home.jsx with all new features
 * This shows how to integrate:
 * - API config
 * - Auth headers
 * - Loading/Error states
 * - Live clock
 * - Custom hooks
 * 
 * Replace your current Home.jsx with this implementation
 */

import axios from 'axios';
import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { endpoints, getAuthHeaders } from '../config/api';
import useApi from '../hooks/useApi';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import LiveClock from './LiveClock';

// Helper functions
const isEscalated = (raisedDate) => {
    const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;
    const now = new Date();
    const raised = new Date(raisedDate);
    return (now.getTime() - raised.getTime()) > SEVEN_DAYS_MS;
};

const formatDate = (dateString) => {
    try {
        return new Date(dateString).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    } catch {
        return 'N/A';
    }
};

const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
        case 'solved':
            return 'bg-green-100 text-green-800';
        case 'pending':
            return 'bg-orange-100 text-orange-800';
        case 'escalated':
            return 'bg-red-100 text-red-800';
        case 'in-progress':
            return 'bg-blue-100 text-blue-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
};

const Home = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { loading, error, callApi } = useApi();
    
    const [municipal, setMunicipal] = useState({});
    const [complaints, setComplaints] = useState([]);
    const [categories, setCategories] = useState([]);
    
    // Filter states
    const [filters, setFilters] = useState({
        complaintId: '',
        category: '',
        date: ''
    });
    
    // Pagination state
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // Check authentication
    useEffect(() => {
        const token = localStorage.getItem("Admin login token");
        if (!token) {
            toast.error("Authentication required. Redirecting to login.");
            navigate('/');
        }
    }, [navigate]);

    // Fetch municipality data
    useEffect(() => {
        const fetchMunicipality = async () => {
            await callApi(async () => {
                const { data } = await axios.post(
                    endpoints.municipal.fetchDistrict,
                    { id },
                    getAuthHeaders()
                );

                if (data.success) {
                    setMunicipal(data.district);
                } else {
                    toast.error(data.message || "Failed to load municipal data.");
                }
            });
        };

        if (id) {
            fetchMunicipality();
        }
    }, [id]);

    // Fetch categories
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const { data } = await axios.get(endpoints.municipal.categories);
                if (data.success) {
                    setCategories(data.categories);
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);

    // Fetch complaints with filters
    const fetchComplaints = async () => {
        if (!municipal.district_name) return;

        await callApi(async () => {
            const filterParams = {
                municipalityName: municipal.district_name,
                page,
                limit: 10
            };

            if (filters.complaintId) filterParams.complaintId = filters.complaintId;
            if (filters.category) filterParams.category = filters.category;
            if (filters.date) filterParams.date = filters.date;

            const { data } = await axios.post(
                `${endpoints.municipal.fetchByName.replace('/fetchByName', '/filter')}`,
                filterParams,
                getAuthHeaders()
            );

            if (data.success) {
                setComplaints(data.complaints);
                setTotalPages(data.totalPages);
            } else {
                setComplaints([]);
                toast.info(data.message || "No complaints found.");
            }
        });
    };

    // Fetch complaints when municipality or filters change
    useEffect(() => {
        fetchComplaints();
    }, [municipal.district_name, page]);

    // Calculate summary stats
    const summaryStats = useMemo(() => {
        let solvedCount = 0;
        let pendingCount = 0;
        let escalatedCount = 0;
        const demeritsScore = municipal.demerits ?? 0;

        complaints.forEach(complaint => {
            const status = complaint.status?.toLowerCase() || '';
            if (status === 'solved') {
                solvedCount++;
            } else if (status === 'pending') {
                pendingCount++;
                if (isEscalated(complaint.raisedDate)) {
                    escalatedCount++;
                }
            }
        });

        return {
            solved: solvedCount,
            pending: pendingCount,
            escalated: escalatedCount,
            demerits: demeritsScore,
        };
    }, [complaints, municipal.demerits]);

    // Handle filter application
    const handleApplyFilter = () => {
        setPage(1); // Reset to first page
        fetchComplaints();
    };

    // Handle show all
    const handleShowAll = () => {
        setFilters({ complaintId: '', category: '', date: '' });
        setPage(1);
        fetchComplaints();
    };

    // Handle view details
    const handleViewDetails = (complaintId) => {
        navigate(`/Complaints/${complaintId}`);
    };

    // Loading and error states
    if (loading && !municipal.district_name) {
        return <LoadingSpinner message="Loading municipal data..." />;
    }

    if (error && !municipal.district_name) {
        return <ErrorMessage message={error} onRetry={fetchComplaints} />;
    }

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            {/* Header Image */}
            <div className="w-full">
                <img
                    src="https://cdn.educba.com/academy/wp-content/uploads/2024/03/Civic-Engagement-.jpg"
                    style={{ width: '100%', height: '45vh', objectFit: 'cover' }}
                    alt="Municipal Corporation"
                />
            </div>

            <div className='m-2 p-2'>
                {/* Navigation Bar */}
                <nav className="bg-white shadow flex items-center justify-between px-8 py-4">
                    <div className="flex items-center gap-3">
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjk_Nso7j1og-0E9l16Bie6dMfxGXGvgN-0A&s"
                            alt="Logo"
                            className="h-12 w-12 rounded-full border"
                        />
                        <span className="text-blue-700 text-xl font-semibold tracking-wide">
                            {municipal.district_name || 'Loading...'} Municipal Corporation
                        </span>
                    </div>
                    <div className="flex items-center gap-8">
                        <LiveClock />
                        <div className="flex items-center gap-2">
                            <span className="text-gray-700 font-medium">
                                {municipal.official_username || 'Official'}
                            </span>
                        </div>
                    </div>
                </nav>

                {/* Summary Cards */}
                <div className='flex-col justify-center items-center gap-y-10 md:w-full md:h-1/2 flex md:flex-row md:gap-6 md:p-4 mt-10'>
                    <div className='p-15 bg-green-400 md:h-full md:w-1/4 md:p-15 md:flex md:flex-col md:justify-center md:items-center shadow-black shadow-lg rounded-xl'>
                        <h1 className='text-3xl text-white'>Solved</h1>
                        <h2 className='text-7xl mt-3 text-white'>{municipal.solved || 0}</h2>
                    </div>
                    <div className='p-15 bg-orange-400 md:h-full md:w-1/4 md:p-15 md:flex md:flex-col md:justify-center md:items-center shadow-black shadow-lg rounded-xl'>
                        <h1 className='text-3xl text-white'>Pending</h1>
                        <h2 className='text-7xl mt-3 text-white'>{municipal.pending || 0}</h2>
                    </div>
                    <div className='p-15 bg-gray-700 md:h-full md:w-1/4 md:p-15 md:flex md:flex-col md:justify-center md:items-center shadow-black shadow-lg rounded-xl'>
                        <h1 className='text-3xl text-white'>Escalated</h1>
                        <h2 className='text-7xl mt-3 text-white'>{summaryStats.escalated}</h2>
                    </div>
                    <div className='p-15 bg-red-500 md:h-full md:w-1/4 md:p-15 md:flex md:flex-col md:justify-center md:items-center shadow-black shadow-lg rounded-xl'>
                        <h1 className='text-3xl text-white'>Demerits</h1>
                        <h2 className='text-7xl mt-3 text-white'>{summaryStats.demerits}</h2>
                    </div>
                </div>

                {/* Filter Bar */}
                <div className='mt-5 flex flex-wrap justify-center gap-4 mb-5 p-4 shadow-2xl bg-white rounded-lg'>
                    <input
                        type='text'
                        className='p-2 border rounded-full w-full sm:w-1/5 min-w-[150px]'
                        placeholder='Enter complaint ID'
                        value={filters.complaintId}
                        onChange={(e) => setFilters({ ...filters, complaintId: e.target.value })}
                    />
                    <select
                        className="w-full sm:w-1/4 border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-2xl"
                        value={filters.category}
                        onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                    >
                        <option value="">Filter by Type...</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.name}>
                                {cat.icon} {cat.name}
                            </option>
                        ))}
                    </select>
                    <input
                        type='date'
                        className='p-2 border rounded-full w-full sm:w-1/5 min-w-[150px]'
                        value={filters.date}
                        onChange={(e) => setFilters({ ...filters, date: e.target.value })}
                    />
                    <button
                        className='bg-blue-600 px-6 py-2 text-white rounded-3xl text-lg hover:bg-blue-700 transition'
                        onClick={handleApplyFilter}
                    >
                        Apply Filter
                    </button>
                    <button
                        className='bg-green-500 px-6 py-2 text-white rounded-3xl text-lg hover:bg-green-600 transition'
                        onClick={handleShowAll}
                    >
                        Show All
                    </button>
                </div>

                {/* Complaints Table */}
                <div className="overflow-x-auto mt-6">
                    {loading && <LoadingSpinner size="small" message="Loading complaints..." />}
                    
                    <table className="min-w-full border border-gray-300 rounded-lg shadow-lg">
                        <thead className="bg-blue-600 text-white">
                            <tr>
                                <th className="px-6 py-3 text-left font-semibold">Complaint ID</th>
                                <th className="px-6 py-3 text-left font-semibold">Category</th>
                                <th className="px-6 py-3 text-left font-semibold">Date</th>
                                <th className="px-6 py-3 text-left font-semibold">Status</th>
                                <th className="px-6 py-3 text-left font-semibold">Assigned To</th>
                                <th className="px-6 py-3 text-left font-semibold">Details</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {complaints.length > 0 ? (
                                complaints.map((complaint) => {
                                    const displayStatus = (complaint.status?.toLowerCase() === 'pending' && isEscalated(complaint.raisedDate))
                                        ? 'escalated'
                                        : complaint.status;

                                    const statusClass = getStatusColor(displayStatus);

                                    return (
                                        <tr key={complaint._id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4">{complaint._id?.slice(-8) || 'N/A'}</td>
                                            <td className="px-6 py-4">{complaint.type || complaint.category || 'N/A'}</td>
                                            <td className="px-6 py-4">{formatDate(complaint.raisedDate || complaint.date)}</td>
                                            <td className="px-6 py-4">
                                                <span className={`${statusClass} px-3 py-1 rounded-full text-xs font-semibold`}>
                                                    {displayStatus}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">{complaint.assignedTo || 'N/A'}</td>
                                            <td>
                                                <button
                                                    className='bg-orange-500 p-3 text-white rounded-2xl hover:bg-orange-600 transition'
                                                    onClick={() => handleViewDetails(complaint._id)}
                                                >
                                                    View Details
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                                        No complaints found for {municipal.district_name || 'the municipality'}.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-4 mt-6 mb-6">
                        <button
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            disabled={page === 1}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-700 transition"
                        >
                            Previous
                        </button>
                        <span className="text-gray-700 font-medium">
                            Page {page} of {totalPages}
                        </span>
                        <button
                            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                            disabled={page === totalPages}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-700 transition"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
