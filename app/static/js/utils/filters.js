import { Cookie } from './cookies.js';

export function productFilter() {
  let allProducts = [];

  document.addEventListener('DOMContentLoaded', () => {
    allProducts = [...document.querySelectorAll('.product-item')];

    // Recuperar filtros desde cookies
    const savedFilters = JSON.parse(Cookie.get('selectedFilters') || '[]');
    applySavedFilters(savedFilters); // Aplicar filtros al cargar la página
    updateFilterCount(); // Actualizar contador de filtros
  });

  function applyFilters() {
    const selectedFilters = Array.from(document.querySelectorAll('.filter-checkbox:checked'))
      .map(input => input.value);

    // Guardar filtros seleccionados en cookies
    Cookie.set('selectedFilters', JSON.stringify(selectedFilters), 7); // Persistir por 7 días

    allProducts.forEach(product => {
      const productFilterId = product.dataset.filterId;
      if (selectedFilters.includes(productFilterId)) {
        product.classList.remove('hidden');
      } else {
        product.classList.add('hidden');
      }
    });

    updateFilterCount();
    toggleFilterModal(); // Cierra el modal
  }

  function resetFilters() {
    allProducts.forEach(product => product.classList.remove('hidden'));
    document.querySelectorAll('.filter-checkbox').forEach(input => (input.checked = false));

    // Eliminar filtros guardados en cookies
    Cookie.delete('selectedFilters');

    updateFilterCount();
  }

  function toggleFilterModal() {
    const modal = document.getElementById('filterModal');
    modal.classList.toggle('hidden');
  }

  function applySavedFilters(filters) {
    if (filters.length === 0) {
      // Si no hay filtros guardados, mostrar todos los productos
      allProducts.forEach(product => product.classList.remove('hidden'));
      return;
    }

    filters.forEach(filter => {
      const checkbox = document.querySelector(`.filter-checkbox[value="${filter}"]`);
      if (checkbox) {
        checkbox.checked = true;
      }
    });

    allProducts.forEach(product => {
      const productFilterId = product.dataset.filterId;
      if (filters.includes(productFilterId)) {
        product.classList.remove('hidden');
      } else {
        product.classList.add('hidden');
      }
    });
  }


  function updateFilterCount() {
    const count = document.querySelectorAll('.filter-checkbox:checked').length;
    document.getElementById('filterCount').textContent = count;
  }

  // Exponer funciones globalmente
  window.applyFilters = applyFilters;
  window.resetFilters = resetFilters;
  window.toggleFilterModal = toggleFilterModal;
}
