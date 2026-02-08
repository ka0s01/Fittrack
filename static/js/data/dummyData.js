const dummyMembers = [
    {
        member_id: 1,
        fname: "Arjun",
        lname: "Reddy",
        email: "arjun@email.com",
        phone: "9123456780",
        dob: "1995-05-15",
        gender: "Male",
        address: "Chennai",
        plan_name: "Premium",
        membership_status: "Active",
        membership_start_date: "2026-01-01",
        membership_end_date: "2026-04-01"
    },
    {
        member_id: 2,
        fname: "Sneha",
        lname: "Iyer",
        email: "sneha@email.com",
        phone: "9123456781",
        dob: "1998-08-22",
        gender: "Female",
        address: "Bangalore",
        plan_name: "Basic",
        membership_status: "Active",
        membership_start_date: "2026-01-05",
        membership_end_date: "2026-02-05"
    },
    {
        member_id: 3,
        fname: "Vikram",
        lname: "Singh",
        email: "vikram@email.com",
        phone: "9123456782",
        dob: "1992-11-30",
        gender: "Male",
        address: "Delhi",
        plan_name: "Platinum",
        membership_status: "Expired",
        membership_start_date: "2025-12-10",
        membership_end_date: "2026-01-10"
    },
    {
        member_id: 4,
        fname: "Priya",
        lname: "Nair",
        email: "priya@email.com",
        phone: "9123456783",
        dob: "1997-03-18",
        gender: "Female",
        address: "Mumbai",
        plan_name: "Annual",
        membership_status: "Active",
        membership_start_date: "2026-01-15",
        membership_end_date: "2027-01-15"
    },
    {
        member_id: 5,
        fname: "Rahul",
        lname: "Sharma",
        email: "rahul@email.com",
        phone: "9123456784",
        dob: "1994-07-25",
        gender: "Male",
        address: "Pune",
        plan_name: "Premium",
        membership_status: "Active",
        membership_start_date: "2026-02-01",
        membership_end_date: "2026-05-01"
    }
];

const dummyTrainers = [
    {
        trainer_id: 1,
        fname: "Rajesh",
        lname: "Kumar",
        email: "rajesh@fittrack.com",
        phone: "9876543210",
        specialization: "Strength",
        certification: "ACE Certified",
        experience: 5,
        hourly_rate: 500,
        hire_date: "2023-01-15"
    },
    {
        trainer_id: 2,
        fname: "Priya",
        lname: "Sharma",
        email: "priya@fittrack.com",
        phone: "9876543211",
        specialization: "Yoga",
        certification: "RYT 500",
        experience: 3,
        hourly_rate: 400,
        hire_date: "2023-03-20"
    },
    {
        trainer_id: 3,
        fname: "Amit",
        lname: "Patel",
        email: "amit@fittrack.com",
        phone: "9876543212",
        specialization: "CrossFit",
        certification: "CrossFit L2",
        experience: 7,
        hourly_rate: 600,
        hire_date: "2022-08-10"
    }
];

const dummySessions = [
    {
        session_id: 1,
        session_date: "2026-02-10",
        start_time: "07:00",
        end_time: "08:00",
        member_name: "Arjun Reddy",
        trainer_name: "Rajesh Kumar",
        session_type: "Personal Training",
        status: "Scheduled"
    },
    {
        session_id: 2,
        session_date: "2026-02-10",
        start_time: "09:00",
        end_time: "10:00",
        member_name: "Sneha Iyer",
        trainer_name: "Priya Sharma",
        session_type: "Yoga",
        status: "Scheduled"
    },
    {
        session_id: 3,
        session_date: "2026-02-08",
        start_time: "06:00",
        end_time: "07:00",
        member_name: "Vikram Singh",
        trainer_name: "Amit Patel",
        session_type: "CrossFit",
        status: "Completed"
    }
];

let dummyAttendance = [
    {
        attendance_id: 1,
        member_id: 1,
        member_name: "Arjun Reddy",
        check_in_date: "2026-02-08",
        check_in_time: "06:30",
        check_out_time: "08:00",
        duration: 1.5
    },
    {
        attendance_id: 2,
        member_id: 2,
        member_name: "Sneha Iyer",
        check_in_date: "2026-02-08",
        check_in_time: "07:00",
        check_out_time: null,
        duration: null
    }
];

const dummyWorkouts = [
    {
        workout_plan_id: 1,
        plan_name: "Beginner Full Body",
        difficulty: "Beginner",
        duration: 4,
        created_by: "Rajesh Kumar",
        created_date: "2026-01-15"
    },
    {
        workout_plan_id: 2,
        plan_name: "Advanced Strength",
        difficulty: "Advanced",
        duration: 8,
        created_by: "Amit Patel",
        created_date: "2026-01-20"
    }
];

const dummyEquipment = [
    {
        equipment_id: 1,
        equipment_name: "Treadmill",
        equipment_type: "Cardio",
        purchase_date: "2023-01-01",
        purchase_cost: 50000,
        status: "Operational",
        last_maintenance: "2026-01-01"
    },
    {
        equipment_id: 2,
        equipment_name: "Dumbbells Set",
        equipment_type: "Strength",
        purchase_date: "2023-01-01",
        purchase_cost: 15000,
        status: "Operational",
        last_maintenance: "2025-12-15"
    },
    {
        equipment_id: 3,
        equipment_name: "Rowing Machine",
        equipment_type: "Cardio",
        purchase_date: "2023-06-15",
        purchase_cost: 35000,
        status: "Under_Maintenance",
        last_maintenance: "2026-02-01"
    }
];

const dummyPayments = [
    {
        payment_id: 1,
        payment_date: "2026-01-01",
        member_name: "Arjun Reddy",
        amount: 2500,
        payment_type: "Membership_Fee",
        payment_method: "UPI",
        status: "Completed"
    },
    {
        payment_id: 2,
        payment_date: "2026-01-05",
        member_name: "Sneha Iyer",
        amount: 1000,
        payment_type: "Membership_Fee",
        payment_method: "Card",
        status: "Completed"
    },
    {
        payment_id: 3,
        payment_date: "2026-02-01",
        member_name: "Rahul Sharma",
        amount: 2500,
        payment_type: "Membership_Fee",
        payment_method: "Cash",
        status: "Pending"
    }
];

const membershipPlans = [
    { plan_id: 1, plan_name: "Basic - ₹1000/month" },
    { plan_id: 2, plan_name: "Premium - ₹2500/3months" },
    { plan_id: 3, plan_name: "Platinum - ₹4500/6months" },
    { plan_id: 4, plan_name: "Annual - ₹8000/year" }
];
