// Template function to generate HTML for a single box
const boxTemplate = ({
  id,
  index,
  unit_count,
  discount_percentage,
  most_popular,
  actual_price,
  discount_price,
  standart_price,
  items = [],
}) => `
  <div class="box${index === 0 ? " box-selected" : ""}" id="${id}">
    <!-- Header Section -->
    <div class="box-header">
      <!-- Radio Button -->
      <div class="radio-button">
        <input type="radio" name="radio-button" ${
          index === 0 ? "checked" : ""
        } />
      </div>
      <!-- Unit and Discount Information -->
      <div class="data">
        <div class="unit-radio-label">
          <div class="unit-count">${unit_count} Unit</div>
          <div class="discount-percentage">${discount_percentage}% Off</div>
        </div>
        <!-- Display 'Standard Price' label if applicable -->
        ${
          standart_price
            ? '<div><span class="price-type">Standard Price</span></div>'
            : ""
        }
      </div>
      <!-- Price Details -->
      <div class="unit-price">
        <div class="discount-price">$${discount_price.toFixed(2)} USD</div>
        <div class="real-price">$${actual_price.toFixed(2)} USD</div>
      </div>
      <!-- Badge for Most Popular Box -->
      ${most_popular ? '<div class="badge">Most Popular</div>' : ""}
    </div>
    <!-- Expandable Container for Items -->
    <div class="box-container" style="display: ${
      index === 0 ? "block" : "none"
    };">
      <!-- Display items table if items exist, otherwise show a placeholder -->
      ${
        items.length
          ? `
        <table>
          <thead>
            <tr>
              <td></td>
              <td>Size</td>
              <td>Colour</td>
            </tr>
          </thead>
          <tbody>
            ${items
              .map(
                (item, idx) => `
              <tr>
                <td>#${idx + 1}</td>
                <td>
                  <select class="size-option" id="size-${id}-${idx}">
                    <option value="${item.size}">${item.size}</option>
                  </select>
                </td>
                <td>
                  <select class="colour-option" id="colour-${id}-${idx}">
                    <option value="${item.colour}">${item.colour}</option>
                  </select>
                </td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>`
          : "No items available"
      }
    </div>
  </div>
`;

// Data for all the boxes
const boxes = [
  {
    id: "b1",
    unit_count: 1,
    discount_percentage: 10,
    most_popular: false,
    actual_price: 24.0,
    discount_price: 10.0,
    standart_price: true,
    items: [
      { size: "S", colour: "Black" },
      { size: "M", colour: "White" },
    ],
  },
  {
    id: "b2",
    unit_count: 2,
    discount_percentage: 20,
    most_popular: true,
    actual_price: 24.0,
    discount_price: 18.0,
    standart_price: false,
    items: [
      { size: "S", colour: "Black" },
      { size: "M", colour: "Blue" },
    ],
  },
  {
    id: "b3",
    unit_count: 3,
    discount_percentage: 30,
    most_popular: false,
    actual_price: 24.0,
    discount_price: 24.0,
    standart_price: false,
    items: [
      { size: "S", colour: "Black" },
      { size: "M", colour: "Blue" },
    ],
  },
];

// Store the ID of the currently selected box for state tracking
let previousSelectedBoxId = boxes[0].id;

// Get references to key DOM elements
const totalPrice = document.querySelector(".total-price");
const boxesContainer = document.querySelector("#boxes");

// Set initial total price to the first box's discount price
totalPrice.innerHTML = `$${boxes[0].discount_price.toFixed(2)} USD`;

// Generate and insert HTML for all boxes into the container
boxesContainer.innerHTML = boxes
  .map((box, index) => boxTemplate({ ...box, index }))
  .join("");

// Event listener for handling box selection changes
boxesContainer.addEventListener("click", (e) => {
  // Get the box element that was clicked
  const clickedBox = e.target.closest(".box");

  // If the click is outside a box or the same box is clicked, do nothing
  if (!clickedBox || clickedBox.id === previousSelectedBoxId) return;

  // Update the previously selected box
  const previousBox = document.getElementById(previousSelectedBoxId);
  previousBox.classList.remove("box-selected");
  previousBox.querySelector(".box-container").style.display = "none";

  // Update the newly selected box
  clickedBox.classList.add("box-selected");
  clickedBox.querySelector(".box-container").style.display = "block";
  clickedBox.querySelector("input[name='radio-button']").checked = true;

  // Update the total price to the selected box's discount price
  const discountPrice = clickedBox.querySelector(".discount-price").textContent;
  totalPrice.innerHTML = discountPrice;

  // Update the ID of the currently selected box
  previousSelectedBoxId = clickedBox.id;
});
