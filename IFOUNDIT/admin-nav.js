
(function () {
  var role = null;
  try { role = localStorage.getItem("ifoundit_role"); } catch (e) {}
  if (role !== "admin") return;

  var nav = document.querySelector(".dashboard-nav-links");
  if (!nav || nav.querySelector("[data-admin-nav]")) return;

  var wrap = document.createElement("div");
  wrap.className = "dropdown";
  wrap.setAttribute("data-admin-nav", "");
  wrap.innerHTML =
    '<a href="admin_report.html">ADMIN <i class="fa-solid fa-chevron-down" style="font-size: 10px; margin-left: 4px;"></i></a>' +
    '<div class="dropdown-content">' +
      '<a href="admin_report.html"><i class="fa-solid fa-file-lines" style="margin-right: 8px; color: #0b3a73;"></i> Reports</a>' +
      '<a href="admin_users.html"><i class="fa-solid fa-users" style="margin-right: 8px; color: #0b3a73;"></i> Users</a>' +
      '<a href="admin_approval.html"><i class="fa-solid fa-circle-check" style="margin-right: 8px; color: #0b3a73;"></i> Approval</a>' +
    '</div>';

  // Place it right after the DASHBOARD link
  var first = nav.querySelector("a");
  if (first && first.nextSibling) nav.insertBefore(wrap, first.nextSibling);
  else nav.appendChild(wrap);
})();