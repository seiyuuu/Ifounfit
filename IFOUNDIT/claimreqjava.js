document.addEventListener("DOMContentLoaded", function () {
    const claimForm = document.getElementById("claimForm");

    if (claimForm) {
        claimForm.addEventListener("submit", function (event) {
            const description = document.getElementById("description").value.trim();
            const colorBrand = document.getElementById("colorbrand").value.trim();
            const uniqueMarks = document.getElementById("unique-marks").value.trim();

            // Kapag may kulang o walang laman ang mga mandatory fields
            if (!description || !colorBrand || !uniqueMarks) {
                event.preventDefault(); // Pipigilan ang pag-submit
                alert("May mga kulang na impormasyon! Pakisagutan ang lahat ng kinakailangang field bago mag-submit.");
            } else {
                event.preventDefault(); // (Opsyonal) Tanggalin o baguhin ito kapag konektado na sa database/backend server
                alert("Claim request successfully submitted!");
                // Halimbawa: window.location.href = "dashboardfinal.html";
            }
        });
    }
});