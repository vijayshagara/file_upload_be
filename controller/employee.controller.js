const express = require("express");
const db = require("../models");
const router = express.Router();
const { checkForUser } = require("../middleware/auth.middleware");

router.post("/add_employee", async (req, res, next) => {
  console.log("=========", req.body);
  let payload = [...req.body];
  try {
    // for (const iterator of payload) {
      const insertdata = await db.NewEmployee.bulkCreate(payload);
      return res.status(200).send(insertdata);
    // }
  } catch (error) {
    console.log(error);
  }
  // let userRole = res.locals.role;
  // if (userRole === "Admin") {
  //   try {
  //     const employee = await db.Employee.findOne({
  //       where: {
  //         employee_email: req.body.employee_email,
  //       },
  //       attributes: ["employee_name", "employee_department"],
  //     });

  //     if (employee) {
  //       return res.status(403).send({
  //         msg: "user already exist",
  //       });
  //     } else {
  //       let payload = {
  //         ...req.body,
  //       };
  //       const employee_data = await db.Employee.create({
  //         ...payload,
  //       });

  //       return res.status(200).send({
  //         id: employee_data.id,
  //       });
  //     }
  //   } catch (error) {
  //     next(error);
  //   }
  // } else {
  //   return res.status(400).send({
  //     msg: "Your not a autheriosed person",
  //   });
  // }
});

router.get("/get_employee", checkForUser, async (req, res, next) => {
  let userRole = res.locals.role;
  if (userRole === "Admin") {
    try {
      const all_employee = await db.Employee.findAll({});

      return res.status(200).send(all_employee);
    } catch (error) {
      console.log(error);
      next(error);
    }
  } else {
    return res.status(400).send({
      msg: "Your not a autheriosed person",
    });
  }
});

router.get("/get_employee/:id", checkForUser, async (req, res, next) => {
  const id = req.params.id;
  let userRole = res.locals.role;
  if (userRole === "Admin") {
    try {
      const employee = await db.Employee.findOne({
        where: {
          id: id,
        },
      });
      return res.status(200).send(employee);
    } catch (error) {
      next(error);
    }
  } else {
    return res.status(400).send({
      msg: "Your not a autheriosed person",
    });
  }
});

router.put("/edit_employee/:id", checkForUser, async (req, res, next) => {
  let userRole = res.locals.role;
  if (userRole === "Admin") {
    try {
      const employeeData = await db.Employee.findOne({
        where: {
          id: req.params.id,
        },
      });

      if (req.body.employee_name) {
        employeeData.employee_name = req.body.employee_name;
      }
      if (req.body.employee_email) {
        employeeData.employee_email = req.body.employee_email;
      }
      if (req.body.employee_type) {
        employeeData.employee_type = req.body.employee_type;
      }
      if (req.body.employee_gender) {
        employeeData.employee_gender = req.body.employee_gender;
      }
      if (req.body.dob) {
        employeeData.dob = req.body.dob;
      }
      if (req.body.employee_joinDate) {
        employeeData.employee_joinDate = req.body.employee_joinDate;
      }
      if (req.body.employee_department) {
        employeeData.employee_department = req.body.employee_department;
      }
      if (req.body.employee_designation) {
        employeeData.employee_designation = req.body.employee_designation;
      }
      if (req.body.employee_grade) {
        employeeData.employee_grade = req.body.employee_grade;
      }
      if (req.body.employee_level) {
        employeeData.employee_level = req.body.employee_level;
      }
      await employeeData.save();
      res.status(200).json({ msg: "successfully updated" });
    } catch (error) {
      next(error);
    }
  } else {
    return res.status(400).send({
      msg: "Your not a autheriosed person",
    });
  }
});

router.delete("/delete_employee/:id", checkForUser, async (req, res, next) => {
  let userRole = res.locals.role;
  if (userRole === "Admin") {
    try {
      await db.Employee.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json({ msg: "successfully delete" });
    } catch (error) {
      next(error);
    }
  } else {
    return res.status(400).send({
      msg: "Your not a autheriosed person",
    });
  }
});

module.exports = router;
