function renderAllServicesGrid() {
  document.getElementById("allServicesGrid").innerHTML = SERVICES.map(serviceCardHTML).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  renderAllServicesGrid();
  renderIconPlaceholders(document);
});
