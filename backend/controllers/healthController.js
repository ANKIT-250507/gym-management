const User = require("../models/User");

const calculateBMI = async (req, res) => {

    try {

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        if (!user.height || !user.weight) {
            return res.status(400).json({
                message: "Please update your height and weight first."
            });
        }

        const heightInMeter = user.height / 100;

        const bmi = user.weight / (heightInMeter * heightInMeter);

        let category = "";
        let advice = "";

        if (bmi < 18.5) {
            category = "Underweight";
            advice = "Increase your calorie intake and follow a muscle gain diet.";
        }
        else if (bmi < 25) {
            category = "Normal Weight";
            advice = "Great! Maintain your current fitness routine.";
        }
        else if (bmi < 30) {
            category = "Overweight";
            advice = "Start regular exercise and maintain a balanced diet.";
        }
        else {
            category = "Obese";
            advice = "Consult a trainer and follow a structured weight loss plan.";
        }

        res.status(200).json({

            member: user.name,

            height: `${user.height} cm`,

            weight: `${user.weight} kg`,

            bmi: bmi.toFixed(2),

            category,

            advice

        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

const calculateProtein = async (req, res) => {

    try {

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        if (!user.weight || !user.goal) {
            return res.status(400).json({
                message: "Please update your weight and goal first."
            });
        }

        let proteinPerKg = 0;

        if (user.goal === "Weight Loss") {
            proteinPerKg = 1.5;
        }
        else if (user.goal === "Maintain Fitness") {
            proteinPerKg = 1.8;
        }
        else if (user.goal === "Muscle Gain") {
            proteinPerKg = 2.2;
        }

        const protein = user.weight * proteinPerKg;

        res.status(200).json({
            member: user.name,
            weight: `${user.weight} kg`,
            goal: user.goal,
            dailyProtein: `${protein.toFixed(1)} g/day`
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }

};
const calculateCalories = async (req, res) => {

    try {

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        if (!user.age || !user.height || !user.weight || !user.gender) {
            return res.status(400).json({
                message: "Please complete your profile first."
            });
        }

        let bmr;

        if (user.gender === "Male") {

            bmr =
                (10 * user.weight) +
                (6.25 * user.height) -
                (5 * user.age) +
                5;

        } else {

            bmr =
                (10 * user.weight) +
                (6.25 * user.height) -
                (5 * user.age) -
                161;

        }

        let activityMultiplier = 1.2;

        switch (user.activityLevel) {

            case "Lightly Active":
                activityMultiplier = 1.375;
                break;

            case "Moderately Active":
                activityMultiplier = 1.55;
                break;

            case "Very Active":
                activityMultiplier = 1.725;
                break;

            case "Extra Active":
                activityMultiplier = 1.9;
                break;

            default:
                activityMultiplier = 1.2;
        }

        let calories = bmr * activityMultiplier;

        if (user.goal === "Weight Loss") {
            calories -= 500;
        }
        else if (user.goal === "Muscle Gain") {
            calories += 300;
        }
        res.status(200).json({

            member: user.name,

            bmr: Math.round(bmr),

            activityLevel: user.activityLevel,

            goal: user.goal,

            dailyCalories: Math.round(calories)

        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports = {
    calculateBMI,
    calculateProtein,
    calculateCalories
};