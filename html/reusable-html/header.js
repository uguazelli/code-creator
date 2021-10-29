
class Header extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `
      <nav
      class="navbar navbar-expand-sm navbar-light"
      style="background-color: #c4c6cb"
    >
      <div class="container-fluid">
        <!--<a class="navbar-brand" href="#">Ztools</a>-->
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
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDarkDropdownMenuLink"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                ORC
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
        <h1 class="fw-bolder">Ztools</h1>
        <p class="lead">Everything you need in one place</p>
        <br />
      </div>
    </header>
      `;
    }
  }

