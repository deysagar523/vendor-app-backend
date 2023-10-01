// backend/routes/vendor.js

const express = require("express");
const router = express.Router();
const Vendor = require("../models/Vendor");

// Define your API routes for creating, reading, updating, and deleting vendors here
// Create a new vendor
router.post("/", async (req, res) => {
  try {
    const newVendor = new Vendor(req.body);
    const savedVendor = await newVendor.save();
    res.status(201).json(savedVendor);
  } catch (error) {
    console.error("Error creating vendor:", error);
    res.status(500).json({ error: "Unable to create vendor" });
  }
});
// Edit a vendor by ID
router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const updatedVendor = await Vendor.findByIdAndUpdate(id, req.body);
    if (!updatedVendor) {
      return res.status(404).json({ error: "Vendor not found" });
    }
    res.json({ message: "Vendor updated successfully", updatedVendor });
  } catch (error) {
    console.error("Error updating vendor:", error);
    res.status(500).json({ error: "Unable to update vendor" });
  }
});
// Delete a vendor by ID
router.put("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const vendor = await Vendor.findById(id);
    if (!vendor) {
      return res.status(404).json({ error: "Vendor not found" });
    }

    // Perform a soft delete by setting the 'deleted' field to true
    vendor.deleted = true;
    await vendor.save();

    res.json({ message: "Vendor soft deleted successfully" });
  } catch (error) {
    console.error("Error soft deleting vendor:", error);
    res.status(500).json({ error: "Unable to soft delete vendor" });
  }
});
// Fetch all vendors
router.get("/", async (req, res) => {
  try {
    const vendors = await Vendor.find();
    res.json(vendors);
  } catch (error) {
    console.error("Error fetching vendors:", error);
    res.status(500).json({ error: "Unable to fetch vendors" });
  }
});

module.exports = router;
