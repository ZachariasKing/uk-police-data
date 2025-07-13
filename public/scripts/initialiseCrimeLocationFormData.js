// Initialise the datepicker
document.addEventListener("DOMContentLoaded", function () {
  var elems = document.querySelectorAll(".datepicker");
  M.Datepicker.init(elems);

  const monthSelect = document.getElementById("monthSelect");
  const yearSelect = document.getElementById("yearSelect");
  const finalDate = document.getElementById("finalDate");

  function updateFinalDate() {
    const month = monthSelect.value;
    const year = yearSelect.value;
    if (month && year) {
      finalDate.value = `${year}-${month}`;
      M.updateTextFields(); // update label position for Materialize
    }
  }

  monthSelect.addEventListener("change", updateFinalDate);
  yearSelect.addEventListener("change", updateFinalDate);


  //Initialise the crime category select dropdown
  var selectElems = document.querySelectorAll("select");
  options = {
    classes: "browser-default",
    dropdownOptions: {
      autoTrigger: true,
      closeOnClick: true,
      coverTrigger: false,
    },
  };
  var instances = M.FormSelect.init(selectElems, options);
});

// Manual form validation
document.getElementById('crime-data-form').addEventListener('submit', function (e) {
  const category = document.getElementById('category-dropdown').value;
  const month = document.getElementById('monthSelect').value;
  const year = document.getElementById('yearSelect').value;

  if (!category || !month || !year) {
    e.preventDefault(); // Stop form from submitting
    M.toast({ html: 'Please fill out all required fields.', classes: 'error' });
  }
});