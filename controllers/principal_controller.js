const PrincipalModel = require('../models/principal_model');

//  GET All Principal
module.exports.getAllPrincipal = (req, res, next) => {
    PrincipalModel.find()
        .then((principals) => {
            const formattedPrincipal = principals.map((eachPrincipal) => {
                return {
                    _id: eachPrincipal._id,
                    name: eachPrincipal.name,
                    username: eachPrincipal.username,
                    password: eachPrincipal.password,
                    role: eachPrincipal.role,
                    state: eachPrincipal.state,
                }
            });
            return res.status(200).json({
                Message: "All Principal Listed Here...",
                Principals: formattedPrincipal,
            });
        })
        .catch((error) => {
            return res.status(500).json({
                Error: error,
            });
        });
};

//  Get Logged in Principal
module.exports.getPrincipalLogin = async (req, res, next) => {
    const queryParams = req.query;

    console.log("ReqParams::: " + JSON.stringify(queryParams));

    const principal = await PrincipalModel.find( queryParams );
    try {
        if (principal.length !== 0) {
            res.status(200).send({
                Message: "Successfully Logged in...",
                Principal: principal[0],
            })
        }
        else {
            res.status(200).json({
                Message: "No record found for this user...",
                Principal: principal,
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            Error: error,
        });
    }
};

//  GET Individual Principal
module.exports.getIndividualPrincipal = (req, res, next) => {
    const reqParams = req.params.individualID;
    PrincipalModel.findOne({_id: reqParams })
        .then((principal) => {
            if (principal) {
                return res.status(200).json({
                    Message: "Individual Principal Listed Here...",
                    Principal: {
                        _id: principal._id,
                        name: principal.name,
                        username: principal.username,
                        password: principal.password,
                        role: principal.role,
                        state: principal.state,
                    },
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

//  ADD Principal
module.exports.addIndividualPrincipal = (req, res, next) => {
    const bodyParam = req.body;

    //  Get instance of the PrincipalModel
    const principal = new PrincipalModel({
        name: bodyParam.name,
        username: bodyParam.username,
        password: bodyParam.password,
        role: bodyParam.role,
        state: bodyParam.state,
    });

    //  Check if the User already exist in Principal record in the DB.
    PrincipalModel.findOne({ username : principal.username })
        .then((existingPrincipal) => {
            if (existingPrincipal) {
                //  This means the user exists so return a response message.
                return res.status(200).json({
                    Message: "User already exist. Please login with your users details."
                });
            }
            else {
                //Save the principal
                principal.save()
                    .then((result) => {
                        return res.status(201).json({
                            Message: "Individual Principal added Successfully...",
                            Principal: {
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
        });

};

//  UPDATE Principal
module.exports.updateIndividualPrincipal = (req, res, next) => {
    const principalID = req.params.individualID;

    PrincipalModel.findByIdAndUpdate(principalID, req.body)
        .then((principal) => {
            console.log(principal)
            return res.status(201).json({
                Message: `Individual Principal with PrincipalID = ${principalID} Updated successfully...`,
                Principal: {
                    _id: principal._id,
                    name: principal.name,
                    username: principal.username,
                    password: principal.password,
                    role: principal.role,
                    state: principal.state,
                },
            });
        })
        .catch((error) => {
            return res.status(500).json({
                Error: error,
            });
        });
};

//  DELETE Individual Principal
module.exports.deleteIndividualPrincipal = (req, res, next) => {
    const principalID = req.params.individualID;

    PrincipalModel.findByIdAndDelete(principalID)
        .then((principal) => {
            return res.status(200).json({
                Message: `Individual Principal with PrincipalID = ${principalID} Deleted successfully...`,
                Principal: {
                    _id: principal._id,
                    name: principal.name,
                    username: principal.username,
                    password: principal.password,
                    role: principal.role,
                    state: principal.status,
                },
            });
        })
        .catch((error) => {
            return res.status(500).json({
                Error: error,
            });
        });
};