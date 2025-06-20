// const Property = require('../models/propertiesModel');
const {Property,User,Interested} = require('../models/index')



const createProperties = async(req,res)=>{
   const { title, description, price, location, type, interestedUser } = req.body;
    const image = req.file ? req.file.filename : null;

    try {
        // Check if user is admin
        if (!req.user || !req.user.IsAdmin) {
            return res.status(403).send({
                message: "You are not authorized to create properties",
                success: false,
            });
        }

        // Create new property
        const newProperty = await Property.create({
            title,
            description,
            price,
            location,
            type,
            interestedUser: interestedUser || [],
            image,
        });

        return res.status(200).send({
            message: "Property created successfully",
            success: true,
            property: newProperty,
        });
    } catch (error) {
        console.error("Error in createProperties:", error);
        return res.status(500).send({
            message: "An error occurred",
            success: false,
            error: error.message,
        });
    }
}

const getAllProperties = async(req,res)=>{
   try {
        // Fetch all properties
        const properties = await Property.findAll();

        // Modify properties for client response
        const modifiedProperties = properties.map((property) => ({
            id: property.id,
            title: property.title,
            description: property.description,
            price: property.price,
            location: property.location,
            type: property.type,
            interestedUser: property.interestedUser,
            image: property.image ? `http://localhost:2000/uploads/${property.image}` : null,
        }));

        return res.status(200).send({
            properties: modifiedProperties,
            message: "All properties fetched successfully",
            success: true,
        });
    } catch (error) {
        console.error("Error in getAllProperties:", error);
        return res.status(500).send({
            message: "An error occurred",
            success: false,
            error: error.message,
        });
    }
}

const getPropertiesByID = async(req,res)=>{
  try {
       const id = req.params.ID;
       const property = await Property.findByPk(id);
       res.status(200).send({property:property,success:true})
    } catch (error) {
        console.log("erro", error)
    }
    
}

const updateProperties = async(req,res)=>{
    try {
        const id = req.params.ID;

        const property = await Property.findByPk(id);
         if(!property){
            res.status(400).send({message:"Property not found", success:false})

        }
        await property.update(req.body);
        res.status(200).send({message:"Property Added successfully",success:true, property})
    } catch (error) {
        console.log("Error updating properties:", error);

    }
    
}

const deleteProperties = async (req, res) => {
    try {
        const id = req.params.ID;
        console.log("Deleting property with ID:", id); // Debug log
        const property = await Property.findByPk(id);
        if (!property) {
            return res.status(400).send({ message: "Property not found", success: false });
        }
        await property.destroy();
        res.status(200).send({ message: "Property Deleted Successfully", success: true });
    } catch (error) {
        console.log("Error deleting property:", error);
        res.status(500).send({ message: "Server error", success: false });
    }
};

const markAsInterested = async (req,res)=>{
    try {
        const propertyId = req.params.ID;
        const userId = req.user.id;

        const existing = await Interested.findOne({where:{userId,propertyId}});

        if(existing){
            return res.status(400).send({message:"Already marked as intersted", success:false})
        }

        await Interested.create({userId, propertyId});
        return res.status(200).send({message:"Marked as interested successfully", success:true});
    } catch (error) {
         console.error('Error in markAsInterested:', error);
        return res.status(500).json({ message: 'An error occurred', success: false });
    }
}

const getInterestedUsers = async(req,res)=>{
    try {
        const propertyId = req.params.ID;

        // Fetch users who are interested in the property
        const interestedUsers = await Interested.findAll({
            where: { propertyId },
            include: [{ model: User, attributes: ['id', 'name', 'email'] }]
        });

        return res.status(200).send({
            message: "Interested users fetched successfully",
            success: true,
            users: interestedUsers
        });
    } catch (error) {
        console.error('Error in getInterestedUsers:', error);
        return res.status(500).json({ message: 'An error occurred', success: false });
    }
}

module.exports = {
    createProperties,
    getAllProperties,
    getPropertiesByID,
    updateProperties,
    deleteProperties,
    markAsInterested,
    getInterestedUsers
}