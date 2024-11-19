import SearchDbSource from '../../api/search-api';
import UmkmsDbSource from '../../api/umkms-api';
import Loading from '../../utility/loading';
import { createUmkmItemTemplate } from '../templates/template-creator';

const renderUmkm = async (list) => {
  const umkmContainer = document.querySelector('#list-umkm');
  umkmContainer.innerHTML = '';
  list.forEach((umkm) => {
    umkmContainer.innerHTML += createUmkmItemTemplate(umkm);
  });
  if (umkmContainer.innerHTML === '') {
    umkmContainer.innerHTML = 'Tidak ada umkm yang ditemukan.';
  }
};

const ListUmkm = {
  async render() {
    return `
      <section id="explore" class="exploreUmkm">
        <search-bar></search-bar>
        <div class="explore-con page-list-umkm">
          <div id="list-umkm"></div>
        </div>
      </section>
    `;
  },

  async afterRender() {
    // RENDER UMKM
    const umkmContainer = document.querySelector('#list-umkm');
    await Loading.loadingPage(umkmContainer);
    const allUmkmList = await UmkmsDbSource.getUmkms();
    const pageload = document.querySelector('.pageload');
    if (pageload) {
      pageload.remove();
    }
    await renderUmkm(allUmkmList);

    const searchInput = document.getElementById('searchInput');
    const searchForm = document.getElementById('searchForm');

    searchInput.addEventListener('input', async (e) => {
      e.preventDefault();
      const query = searchInput.value;
      const filteredUmkms = await SearchDbSource.search(query);
      await renderUmkm(filteredUmkms.umkms);
    });

    searchForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const query = searchInput.value;
      const filteredUmkms = await SearchDbSource.search(query);
      await renderUmkm(filteredUmkms.umkms);
    });
  },
};

export default ListUmkm;
