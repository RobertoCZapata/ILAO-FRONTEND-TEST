import { Common } from './common/index.js';
import { productFilter } from './utils/filters.js';

Common(() => {
  document.addEventListener('alpine:init', () => {
    Alpine.data('productFilter', productFilter);
  });

  // Llama a productFilter para inicializar
  productFilter();
});
