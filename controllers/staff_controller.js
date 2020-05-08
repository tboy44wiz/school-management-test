const StaffModel = require('../models/staff_model');

//  GET All Staff
module.exports.getAllStaff = (req, res, next) => {
    StaffModel.find()
        .then((staff) => {
            const formattedStaff = staff.map((eachStaff) => {
                return {
                    _id: eachStaff._id,
                    name: eachStaff.name,
                    username: eachStaff.username,
                    password: eachStaff.password,
                    role: eachStaff.role,
                    state: eachStaff.status,
                }
            });
            return res.status(200).json({
                Message: "All Staff Listed Here...",
                Staff: formattedStaff,
            });
        })
        .catch((error) => {
            return res.status(500).json({
                Error: error,
            });
        });
};

//  Get Logged in Staff
module.exports.getStaffLogin = async (req, res, next) => {
    const queryParams = req.query;

    console.log("ReqParams::: " + JSON.stringify(queryParams));
    const staff = await StaffModel.find(queryParams);
    console.log(staff);

    try {
        if (staff.length !== 0) {
            res.status(200).json({
                Message: "Successfully Logged in...",
                Staff: staff[0],
            })
        }
        else {
            res.status(200).json({
                Message: "No record found for this user...",
                Staff: staff,
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            Error: error,
        });
    }
};

//  GET Individual Staff
module.exports.getIndividualStaff = (req, res, next) => {
    const staffID = req.params.individualID;
    StaffModel.findById(staffID)
        .then((staff) => {
            if (staff) {
                return res.status(200).json({
                    Message: "Individual Staff Listed Here...",
                    Staff: {
                        _id: staff._id,
                        name: staff.name,
                        username: staff.username,
                        password: staff.password,
                        role: staff.role,
                        state: staff.status,
                    }
                });
            }
            else {
                return res.status(404).json({
                    Message: "No record found for this user...",
                });
            }
        })
        .catch((error) => {
            return res.status(500).json({
                Error: error,
            });
        });
};

//  ADD Staff
module.exports.addIndividualStaff = (req, res, next) => {
    const bodyParam = req.body;

    //  Get instance of the StaffModel
    const staff = new StaffModel({
        name: bodyParam.name,
        username: bodyParam.username,
        password: bodyParam.password,
        role: bodyParam.role,
        state: bodyParam.state,
    })

    //  Check if the User already exist in Staff record in the DB.
    StaffModel.findOne({ username : staff.username })
        .then((existingStaff) => {
            if (existingStaff) {
                //  This means the user exists so return a response message.
                return res.status(200).json({
                    Message: "User already exist. Please login with your users details."
                });
            }
            else {
                //Save the staff
                staff.save()
                    .then((result) => {
                        return res.status(201).json({
                            Message: "Individual Staff Added Here...",
                            Staff: {
                                _id: result._id,
                                name: result.name,
                                username: result.username,
                                password: result.password,
                                role: result.role,
                                state: result.status,
                            },
                        });
                    })
                    .catch((error) => {
                        return res.status(500).json({
                            Error: error,
                        });
                    });
            }
        })
};

//  UPDATE Staff
module.exports.updateIndividualStaff = (req, res, next) => {
    const staffID = req.params.individualID;

    StaffModel.findByIdAndUpdate(staffID, req.body)
        .then((staff) => {
            return res.status(201).json({
                Message: `Individual Staff with StaffID = ${staffID} Updated successfully...`,
                Staff: {
                    _id: staff._id,
                    name: staff.name,
                    username: staff.username,
                    password: staff.password,
                    role: staff.role,
                    state: staff.status,
                },
            });
        })
        .catch((error) => {
            return res.status(500).json({
                Error: error,
            });
        });
};

//  DELETE Individual Staff
module.exports.deleteIndividualStaff = (req, res, next) => {
    const staffID = req.params.individualID;

    StaffModel.findByIdAndDelete(staffID)
        .then((staff) => {
            return res.status(200).json({
                Message: `Individual Staff with StaffID = ${staffID} Deleted successfully...`,
                Staff: {
                    _id: staff._id,
                    name: staff.name,
                    username: staff.username,
                    password: staff.password,
                    role: staff.role,
                    state: staff.status,
                },
            });
        })
        .catch((error) => {
            return res.status(500).json({
                Error: error,
            });
        });
};