import dom from 'domtastic';

export default function getElement(id) {
  return dom(`[data-element-id="${id}"]`);
}