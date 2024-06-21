document
    .getElementById("dietForm")
    .addEventListener("submit", async function(event) {
        event.preventDefault();

        const targetCalories = document.getElementById("targetCalories").value;
        const API_KEY = "9cb09811fe714af4ae0fb4d82c6b996d"; // Replace with your Spoonacular API key

        try {
            console.log("Fetching diet plan...");
            const response = await fetch(
                `https://api.spoonacular.com/mealplanner/generate?timeFrame=day&targetCalories=${targetCalories}&apiKey=${API_KEY}`
            );
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const dietPlan = await response.json();
            console.log("Diet plan received:", dietPlan);
            displayDietPlan(dietPlan);
        } catch (error) {
            console.error("Error fetching diet plan:", error);
        }
    });

function displayDietPlan(dietPlan) {
    const dietPlanDiv = document.getElementById("dietPlan");
    if (dietPlan.meals) {
        dietPlanDiv.innerHTML = `
          <h2>Your Diet Plan</h2>
          ${dietPlan.meals
            .map(
              (meal) => `
              <p><strong>${meal.title}</strong><br>
              Ready in ${meal.readyInMinutes} minutes<br>
              Servings: ${meal.servings}</p>
          `
            )
            .join("")}
      `;
  } else {
    dietPlanDiv.innerHTML =
      "<p>Could not fetch diet plan. Please try again later.</p>";
  }
}