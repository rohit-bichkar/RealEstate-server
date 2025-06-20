const Inquiry = require('../models/inquiryModel')

const createInquiry = async(req,res)=>{
    const{name,email,phone,message} = req.body;
    try {
        if(!name || !email || !message){
            res.status(400).send({message:"Name, Email, and Message are required."})
        }
        const newInquiry = await Inquiry.create({name,email,phone,message});
        res.status(200).send({message:"Inquiry created successfully", success:true, newInquiry})
    } catch (error) {
        console.error('Error creating inquiry:', error);
        res.status(500).json({ message: 'Error creating inquiry', error });
}
}

const getAllInquiry = async(req,res)=>{
      try {
        const inquiries = await Inquiry.findAll({ order: [['createdAt', 'DESC']] });
        res.status(200).json({ success: true, inquiries }); 
    } catch (error) {
        console.error('Error fetching inquiries:', error);
        res.status(500).json({ success: false, message: 'Error fetching inquiries', error });
    }
}

module.exports = {
    createInquiry,
    getAllInquiry
}