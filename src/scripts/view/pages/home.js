import ProductsDbSource from '../../api/products-api';
import ReviewsDbSource from '../../api/reviews-api';
// import footerGsapJs from '../../utility/animation/home-page/footer-gsap';
import homeGsapJs from '../../utility/animation/home-page/home-gsap';
import homeProdukGsapJs from '../../utility/animation/home-page/home-produk-gsap';
import homeReviewGsapJs from '../../utility/animation/home-page/home-review-gsap';
import { createFreeProductItemTemplate, createReviewItemTemplate } from '../templates/template-creator';

const Home = {
  async render() {
    return `
      <section id="home">
        <picture>
          <source 
            type="image/jpeg" 
            srcset="./images/hero-image.jpeg">
          <source 
            type="image/webp"
            srcset="./images/hero-image.webp">
          <source 
            type="image/jpeg"
            media="(max-width: 600px)" 
            srcset="./images/hero-image-small.jpg">
          <img
            src='./images/hero-image.jpg' 
            alt="Hero Image"
          >
        </picture>
        <hero-section></hero-section>
      </section>
      <headline-section></headline-section>
        <section id="infoUmkmCon">
          <div class="infoUMKM">
            <div class="info">
              <div class="judul">
                <h3><span>Ayo</span> cari tahu</h3>
              </div>
              <div class="infoDesc">
                <p>
                  UMKM (Usaha Mikro, Kecil, dan Menengah)
                  merupakan tulang punggung perekonomian yang memiliki peran penting dalam 
                  mendorong perekonomian lokal, termasuk di Kota Manado.
                </p>
              </div>
              <div class="btnInfo">
                <a href="#/umkms">List UMKM</a>
              </div>
            </div>
            <div id="umkm-list">
                <umkm-slider></umkm-slider>
              </div>
          </div>
        </section>
        <section id="datalineCon">
         <div class="dataline">
            <div class="dataUmkmCon">
              <div class="dataUmkmTitle">
                <h4 class="umkmTitle">DATA UMKM</h4>
                <p>Manado tahun 2023</p>
              </div>
              <div class="dataUmkmNumber">
                <h4 class="umkmNumber">19.500</h4>
                <p>unit usaha</p>
              </div>
              <div class="dataSector">
                <p>3 sektor yang mendominasi aktivitas UMKM</p>
                <div class="sectorCon">
                  <p>Kuliner</p>
                  <p>Kerajinan Tangan</p>
                  <p>Perdagangan</p>
                </div>
              </div>
            </div>
         </div>
        </section>
        <section class="explore-con">
          <div class="infoProduk">
            <div class="info">
              <div class="judul">
                <h3><span>For</span> Information</h3>
              </div>
              <div class="infoDesc">
                <p>Jelajahi produk-produk berkualitas dari semua UMKM yang terdaftar disini. Ayo temukan produk berupa barang, makanan, minuman, dan lainnya di sini.</p>
              </div>
            </div>
            <div class="infoImage"> 
              <img src="./images/info-umkm.png" alt="Gambar Ilustrasi Produk"> 
            </div>
          </div>
        </section>
        <section class="explore-con">
          <div id="products" class="scroll"></div>
        </section>
        <section class="explore-con">
          <h2 class="titleReview">Jejak Pendapat Pelanggan</h2>
          <div id="reviews" class="infinite-scroll"></div>
        </section>
        <div>
          <div class="separator"></div>
        </div>
    `;
  },

  async afterRender() {
    homeGsapJs();
    // CLICK EVENTS
    const cat = document.querySelector('#cat');
    const explore = document.querySelector('headline-section');

    cat.addEventListener('click', () => {
      explore.scrollIntoView({ behavior: 'smooth' });
    });
    // --------------------------------------------

    // RENDER PRODUCTS
    const productContainer = document.querySelector('#products');
    productContainer.innerHTML = '';
    const allProductList = await ProductsDbSource.getProducts();

    if (allProductList.length === 0) {
      productContainer.innerHTML = 'Tidak ada produk untuk ditampilkan.';
    } else {
      allProductList.forEach((product) => {
        productContainer.innerHTML += createFreeProductItemTemplate(product);
      });
    }
    homeProdukGsapJs();

    // --------------------------------------------

    // RENDER REVIEWS
    const reviewContainer = document.querySelector('#reviews');
    reviewContainer.innerHTML = '';
    const reviews = await ReviewsDbSource.getReviews();

    reviews.forEach((review) => {
      reviewContainer.innerHTML += createReviewItemTemplate(review);
    });

    if (reviewContainer.innerHTML === '') {
      reviewContainer.innerHTML = 'Tidak ada review untuk ditampilkan.';
    }
    // --------------------------------------------
    homeReviewGsapJs();
    // footerGsapJs();
  },
};

export default Home;
