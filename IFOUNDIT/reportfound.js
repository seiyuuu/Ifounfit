// reportfound.js - logic for the Report Found Item form

document.addEventListener("DOMContentLoaded", function () {
    var locationSelect = document.getElementById("location");
    var otherGroup = document.getElementById("other-location-group");
    var otherInput = document.getElementById("other-location");
    var photoInput = document.getElementById("photo-input");
    var uploadBox = document.querySelector(".upload-box");
    var uploadSubtext = document.querySelector(".upload-subtext");
    var MAX_SIZE = 5 * 1024 * 1024; // 5MB

    // Show / hide the "Other" location box
    if (locationSelect) {
        locationSelect.addEventListener("change", function () {
            var isOther = locationSelect.value === "Other";
            otherGroup.style.display = isOther ? "flex" : "none";
            otherInput.required = isOther;
            if (!isOther) otherInput.value = "";
        });
    }

    // Photo: validate size/type and show the file name
    if (photoInput) {
        photoInput.addEventListener("change", function () {
            handleFile(photoInput.files[0]);
        });
    }

    // Drag and drop support
    if (uploadBox) {
        ["dragenter", "dragover"].forEach(function (evt) {
            uploadBox.addEventListener(evt, function (e) {
                e.preventDefault();
                uploadBox.style.borderColor = "#0b2241";
                uploadBox.style.backgroundColor = "#f1f5f9";
            });
        });
        ["dragleave", "drop"].forEach(function (evt) {
            uploadBox.addEventListener(evt, function (e) {
                e.preventDefault();
                uploadBox.style.borderColor = "";
                uploadBox.style.backgroundColor = "";
            });
        });
        uploadBox.addEventListener("drop", function (e) {
            var file = e.dataTransfer.files[0];
            if (file) {
                var dt = new DataTransfer();
                dt.items.add(file);
                photoInput.files = dt.files;
                handleFile(file);
            }
        });
    }

    function handleFile(file) {
        if (!file) return;
        if (!file.type.startsWith("image/")) {
            alert("Please upload an image file only.");
            photoInput.value = "";
            return;
        }
        if (file.size > MAX_SIZE) {
            alert("Image is too large. Maximum file size is 5MB.");
            photoInput.value = "";
            uploadSubtext.textContent = "Max file size: 5MB";
            return;
        }
        uploadSubtext.textContent = "Selected: " + file.name;
    }
});

// Contact must be a PH mobile number or a social media / profile link
function isValidContact(value) {
    var v = value.trim();
    var phone = /^(\+?63|0)9\d{9}$/;          // 09123456789 or +639123456789
    var link = /^(https?:\/\/)?([\w-]+\.)+[a-z]{2,}(\/\S*)?$/i; // facebook.com/name
    var handle = /^@[\w.]{2,}$/;              // @username
    return phone.test(v.replace(/[\s-]/g, "")) || link.test(v) || handle.test(v);
}

// Small notification at the top of the page (replaces alert popups)
function showToast(message, type) {
    var old = document.getElementById("toast-notif");
    if (old) old.remove();

    var toast = document.createElement("div");
    toast.id = "toast-notif";
    toast.textContent = message;
    toast.style.cssText =
        "position:fixed;top:80px;left:50%;transform:translateX(-50%) translateY(-10px);" +
        "padding:12px 22px;border-radius:8px;font-size:14px;font-weight:bold;color:#fff;" +
        "box-shadow:0 8px 20px rgba(0,0,0,0.15);z-index:2000;opacity:0;" +
        "transition:opacity .25s, transform .25s;" +
        "background:" + (type === "success" ? "#10b981" : "#e11d48") + ";";
    document.body.appendChild(toast);

    requestAnimationFrame(function () {
        toast.style.opacity = "1";
        toast.style.transform = "translateX(-50%) translateY(0)";
    });
    setTimeout(function () {
        toast.style.opacity = "0";
        setTimeout(function () { toast.remove(); }, 300);
    }, 3000);
}

function submitFoundReport() {
    var title = document.getElementById("Title").value.trim();
    var category = document.getElementById("category").value;
    var dateFound = document.getElementById("date-found").value;
    var location = document.getElementById("location").value;
    var otherLocation = document.getElementById("other-location").value.trim();
    var specific = document.getElementById("specific-location").value.trim();
    var description = document.getElementById("Description").value.trim();
    var contact = document.getElementById("founder-contact").value.trim();
    var photoInput = document.getElementById("photo-input");

    // Validation - highlight empty fields and show one notification
    var required = [
        ["Title", title],
        ["category", category],
        ["date-found", dateFound],
        ["location", location],
        ["specific-location", specific],
        ["founder-contact", contact]
    ];
    if (location === "Other") required.push(["other-location", otherLocation]);

    var hasEmpty = false;
    required.forEach(function (item) {
        var el = document.getElementById(item[0]);
        if (!item[1]) {
            hasEmpty = true;
            el.style.borderColor = "#e11d48";
            el.addEventListener("input", function clear() {
                el.style.borderColor = "";
                el.removeEventListener("input", clear);
            });
            el.addEventListener("change", function clear2() {
                el.style.borderColor = "";
                el.removeEventListener("change", clear2);
            });
        } else {
            el.style.borderColor = "";
        }
    });

    if (hasEmpty) {
        return showToast("Please fill in all required fields.", "error");
    }
    if (!isValidContact(contact)) {
        document.getElementById("founder-contact").style.borderColor = "#e11d48";
        return showToast("Please enter a valid contact number or social media link.", "error");
    }

    var finalLocation = location === "Other" ? otherLocation : location;

    function save(photoData) {
        var report = {
            id: Date.now(),
            type: "found",
            title: title,
            category: category,
            dateFound: dateFound,
            location: finalLocation,
            specificLocation: specific,
            description: description,
            founderContact: contact,
            photo: photoData || "",
            status: "pending",
            submittedAt: new Date().toISOString()
        };

        try {
            var reports = JSON.parse(localStorage.getItem("foundReports") || "[]");
            reports.push(report);
            localStorage.setItem("foundReports", JSON.stringify(reports));
        } catch (err) {
            // Storage full (usually because of the photo) - retry without it
            try {
                report.photo = "";
                var again = JSON.parse(localStorage.getItem("foundReports") || "[]");
                again.push(report);
                localStorage.setItem("foundReports", JSON.stringify(again));
            } catch (e2) {
                return showToast("Could not save your report. Please try again.", "error");
            }
        }

        showToast("Report submitted! Thank you for helping the community reconnect.", "success");
        setTimeout(function () { window.location.href = "dashboardfinal.html"; }, 1800);
    }

    var file = photoInput.files[0];
    if (file) {
        var reader = new FileReader();
        reader.onload = function (e) { save(e.target.result); };
        reader.onerror = function () { save(""); };
        reader.readAsDataURL(file);
    } else {
        save("");
    }
}