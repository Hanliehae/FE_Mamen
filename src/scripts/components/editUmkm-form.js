const { default: Swal } = require('sweetalert2');
const { default: UmkmsDbSource } = require('../api/umkms-api');
const { renderUmkm } = require('../view/pages/profile');

/* eslint-disable class-methods-use-this */
class editUmkmForm extends HTMLElement {
  emptyContent() {
    this.innerHTML = '';
  }

  connectedCallback() {
    this.render();
  }

  async editUmkm() {
    const umkmByUser = await UmkmsDbSource.getUmkmByUser();
    const closeFormButton = document.getElementById('closeFormButtonEdit');
    const popupForm = document.querySelector('editumkm-form');
    const { id } = umkmByUser[0];

    // Set form values from UMKM data
    document.getElementById('nameEdit').value = umkmByUser[0].name;
    document.getElementById('descriptionEdit').value = umkmByUser[0].description;
    document.getElementById('subdistrictEdit').value = umkmByUser[0].subdistrict;
    document.getElementById('addressEdit').value = umkmByUser[0].address;
    document.getElementById('contactEdit').value = umkmByUser[0].contact;
    document.getElementById('yearEdit').value = umkmByUser[0].year;

    // Form submission handler
    async function handleSubmit(event) {
      event.preventDefault();
      const name = document.getElementById('nameEdit').value;
      const description = document.getElementById('descriptionEdit').value;
      const subdistrict = document.getElementById('subdistrictEdit').value;
      const address = document.getElementById('addressEdit').value;
      const contact = document.getElementById('contactEdit').value;
      const year = document.getElementById('yearEdit').value;
      const umkm = {
        name, description, subdistrict, address, contact, year,
      };

      try {
        popupForm.style.display = 'none';

        await UmkmsDbSource.putUmkmById(id, umkm);

        const umkmDetailByUser = await UmkmsDbSource.getUmkmByUser();

        await renderUmkm(umkmDetailByUser[0]);

        Swal.fire({
          icon: 'success',
          title: 'Berhasil',
          text: 'Data UMKM berhasil diperbarui!',
        });
      } catch (error) {
      // Show error message
        Swal.fire({
          icon: 'error',
          title: 'Gagal',
          text: `Terjadi kesalahan: ${error.message}`,
        });
      }
    }

    // Close the form popup
    closeFormButton.addEventListener('click', () => {
      popupForm.style.display = 'none';
    });

    // Ensure no duplicate listeners
    const form = document.getElementById('umkmFormEdit');
    form.removeEventListener('submit', handleSubmit);
    form.addEventListener('submit', handleSubmit);
  }

  render() {
    this.emptyContent();
    this.innerHTML += `
    <div id="popupFormEdit" class="popup-form">
        <div id="popup-contentEdit" class="popup-content">
            <span id="closeFormButtonEdit" class="close-button">&times;</span>
            <h2>Edit UMKM</h2>
            <form id="umkmFormEdit">
                <label for="name">Nama:</label>
                <input type="text" id="nameEdit" name="name" required>

                <label for="description">Description:</label>
                <textarea id="descriptionEdit" name="description" required></textarea>

                <label for="subdistrict">Subdistrict:</label>
                <input type="text" id="subdistrictEdit" name="subdistrict" required>

                <label for="address">Address:</label>
                <input type="text" id="addressEdit" name="address" required>

                <label for="contact">Contact:</label>
                <input type="text" id="contactEdit" name="contact" required>

                <label for="year">Year:</label>
                <input type="number" id="yearEdit" name="year" min="1900" max="2024" required>

                <button type="submit">Submit</button>
            </form>
        </div>
    </div>
      `;
    this.editUmkm();
  }
}

customElements.define('editumkm-form', editUmkmForm);
