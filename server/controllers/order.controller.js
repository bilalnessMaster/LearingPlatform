import dotenv from "dotenv";
import Order from "../lib/database/models/Order.js";
import StudentCourse from "../lib/database/models/StudentCourses.js";
import Course from "../lib/database/models/Course.js";
import paypal from "../helpers/paypal.js";
dotenv.config();

export const createPayment = async (req, res) => {
  try {
    const {
      userId,
      userName,
      userEmail,
      orderStatus,
      paymentMethod,
      paymentStatus,
      orderDate,
      paymentId,
      payerId,
      instructorId,
      instructorName,
      courseImage,
      courseTitle,
      courseId,
      coursePricing,
    } = req.body;
    const payment_json = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url: `${process.env.CLIENT_URL}/success-payment`,
        cancel_url: `${process.env.CLIENT_URL}/cancel-payment`,
      },
      transactions: [
        {
          item_list: {
            items: [
              {
                name: courseTitle,
                sku: courseId,
                price: coursePricing,
                currency: "USD",
                quantity: 1,
              },
            ],
          },
          amount: {
            currency: "USD",
            total: coursePricing,
          }
        },
      ],
    };
    paypal.payment.create(payment_json, async function (error, payment) {
      if (error) {
        res.status(500).json({
          message: "internal server error exaclty at checking payment info",
          success: false,
        });
        throw error;
      }
      const order = new Order({
        userId,
        userName,
        userEmail,
        paymentMethod,
        paymentStatus,
        orderDate,
        paymentId,
        payerId,
        instructorId,
        instructorName,
        courseImage,
        courseTitle,
        courseId,
        coursePricing,
      });
      await order.save();
      const approvalUrl = payment.links.find(
        (link) => link.rel === "approval_url"
      );
      res.status(200).json({
        message: "payment created ant order created",
        success: true,
        approvalUrl,
        orderId: order._id,
      });
    });
  } catch (error) {
    console.log("error occured while creating a payment " + error);
    res.status(500).json({
      message: "internal server error",
      success: false,
    });
  }
};

export const checkPayment = async (req, res) => {
  try {
    const { paymentId, payerId, orderId } = req.body;
    const order = await Order.findById(orderId);
    if (!order)
      res.status(404).json({
        message: "order not found",
        success: false,
      });
    order.paymentStatus ='paid'
    order.orderStatus = 'confirmed'
    order.paymentId  = paymentId ,
    order.payerId = payerId
    await order.save()
    
    const studentCourse = await StudentCourse.findOne({userId : order.userId})
    if(studentCourse){
      studentCourse.courses.push({
        _id : order.courseId ,
        dateOfPurchase  : order.orderDate
      })
      await studentCourse.save()
    }else{
      const NewStudentCourses = await StudentCourse.create({
        userId : order.userId , 
        courses : [
          {
            _id : order.courseId ,
            dateOfPurchase  : order.orderDate
          }
        ]
      })
      await NewStudentCourses.save()
    }
    const course =await Course.findByIdAndUpdate(order.courseId , {
      $addToSet : { 
        students : { 
          studentId : order.userId , 
          studentName : order.userName , 
          studentEmail : order.userEmail,
          paidAmount : order.coursePricing
        }
      }
    })
    res.status(200).json({
      message : "order confirmed" , 
      success : true ,
      data : order

    })
  } catch (error) {
    console.log("error occured while checking a payment " + error);
    res.status(500).json({
      message: "internal server error",
      success: false,
    });
  }
};
