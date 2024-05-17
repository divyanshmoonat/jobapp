const JobModel = require("../models/job");

const createJob = async (req, res) => {
  const jobObj = req.body;
  const newJob = new JobModel(jobObj);
  const newlySavedJob = await newJob.save();
  console.log(newlySavedJob);
  //   console.log(req.body);
  res.json({
    success: true,
    message: "Job created successfully",
    jobId: newlySavedJob._id,
  });
};

const listJob = async (req, res) => {
  const { minSalary, maxSalary } = req.query;
  const jobsList = await JobModel.find({
    $and: [{ salary: { $gte: minSalary } }, { salary: { $lte: maxSalary } }],
  });
  //   console.log(jobsList);
  res.json({
    success: true,
    message: "List job api",
    results: jobsList,
  });
};

const editJob = async (req, res) => {
  const jobId = req.params.id;
  console.log(jobId);
  console.log(req.body);
  // Model.findByIdAndUpdate(_ID TO FIND THE RECORD, FIELDS WITH DATA TO UPDATE)
  await JobModel.findByIdAndUpdate(jobId, req.body);
  // JobModel.findOneAndUpdate(FIND OBJECT, UPDATE OBJECT)
  const findObj = {
    company: "Google",
  };
  const updateObj = {
    age: 10,
  };
  //   await JobModel.findOneAndUpdate(findObj, updateObj); // It will update the first matching record
  //   await JobModel.updateMany(findObj, updateObj); // It will update all matching records
  res.json({
    success: true,
    message: "Job edited successfully",
  });
};

const deleteJob = async (req, res) => {
  const jobId = req.params.id;
  //   await JobModel.findByIdAndDelete(jobId);
  const findObj = {
    age: 0,
  };
  //   await JobModel.findOneAndDelete(findObj);
  await JobModel.deleteMany(findObj); // Dangerous method (Avoid using it)
  res.json({
    success: true,
    message: "Dummy Delete job api",
  });
};

const jobController = {
  createJob,
  listJob,
  editJob,
  deleteJob,
};

module.exports = jobController;