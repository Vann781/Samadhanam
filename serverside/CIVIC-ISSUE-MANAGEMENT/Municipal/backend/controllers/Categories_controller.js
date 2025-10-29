/**
 * Complaint Categories Controller
 * Provides dynamic complaint categories for dropdowns
 */

const getComplaintCategories = async (req, res) => {
  try {
    const categories = [
      { id: 1, name: 'Potholes', icon: '🕳️', color: 'orange' },
      { id: 2, name: 'Garbage', icon: '🗑️', color: 'green' },
      { id: 3, name: 'Street Light', icon: '💡', color: 'yellow' },
      { id: 4, name: 'Drainage', icon: '🚰', color: 'blue' },
      { id: 5, name: 'Sewage', icon: '🚿', color: 'brown' },
      { id: 6, name: 'Roads', icon: '🛣️', color: 'gray' },
      { id: 7, name: 'Traffic Light', icon: '🚦', color: 'red' },
      { id: 8, name: 'Water Supply', icon: '💧', color: 'cyan' },
      { id: 9, name: 'Graffiti', icon: '🎨', color: 'purple' }
    ];
    
    res.json({ success: true, categories });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: "Error fetching categories" 
    });
  }
};

module.exports = { getComplaintCategories };
