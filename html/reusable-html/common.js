class Header extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <nav
      class="navbar navbar-expand-sm navbar-light"
      style="background-color: #c4c6cb"
    >
      <div class="container-fluid">
        <!--<a class="navbar-brand" href="#">Go Tools</a>-->
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDarkDropdown"
          aria-controls="navbarNavDarkDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDarkDropdown">
          <ul class="navbar-nav">
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDarkDropdownMenuLink"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Spreadsheet
              </a>
              <ul
                class="dropdown-menu dropdown-menu-dark"
                aria-labelledby="navbarDarkDropdownMenuLink"
              >
                <li>
                  <a class="dropdown-item" href="excel-to-json.html">Excel to Json</a>
                </li>
                <!--
                <li>
                  <a class="dropdown-item" href="json-to-excel.html">Json to Excel</a>
                </li>
                -->
                <li>
                  <a class="dropdown-item" href="excel-to-csv.html">Excel to CSV</a>
                </li>
                <li>
                  <a class="dropdown-item" href="csv-to-excel.html">CSV to Excel</a>
                </li>
              </ul>
            </li>

            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDarkDropdownMenuLink"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                OCR
              </a>
              <ul
                class="dropdown-menu dropdown-menu-dark"
                aria-labelledby="navbarDarkDropdownMenuLink"
              >
                <li>
                  <a class="dropdown-item" href="image-to-text.html">Image to Text</a>
                </li>
              </ul>
            </li>

            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDarkDropdownMenuLink"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                PDF
              </a>
              <ul
                class="dropdown-menu dropdown-menu-dark"
                aria-labelledby="navbarDarkDropdownMenuLink"
              >
                <li>
                  <a class="dropdown-item" href="#">Spreadsheet to Json</a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">Json to Spreadsheet</a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">Spreadsheet to csv</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <!-- Header-->
    <header style="background-color: #c4c6cb">
      <div class="container px-4 text-center">
        <h1 class="fw-bolder"><span class="text-danger">Go</span><span class="text-dark">Tools</span></h1>
        <p class="lead">Everything you need in one place</p>
        <br />
      </div>
    </header>
      `;
  }
}

class Footer extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <footer class="py-5 bg-dark fixed-bottom">
    <div class="container px-4">
      <p class="m-0 text-center text-white">
        Copyright &copy; Your Website 2021
      </p>
    </div>
  </footer>
    `;
  }
}

class Spinner extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <section id="spinner-section" style="display: none">
            <button class="btn btn-secondary" type="button" disabled>
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            Loading...
            </button>
        </section>
      `;
  }
}
