const matchDarkMode = window.matchMedia("(prefers-color-scheme: dark)");
if (matchDarkMode.matches) {
    document.querySelector('html').classList.add("dark");
}

let colourPaletteButton = document.querySelectorAll('[data-md-component="palette"]');
if (colourPaletteButton.length > 0) {
    colourPaletteButton[0].addEventListener("click", function(event) {
        event.stopPropagation();
        let targetAttr = event.target.getAttribute("data-md-color-media");
        if (targetAttr != null) {
            let html = document.querySelector("html");
            if (targetAttr === "(prefers-color-scheme: light)" && html.classList.contains("dark")) {
                html.classList.remove("dark");
            } else if (targetAttr === "(prefers-color-scheme: dark)" && !html.classList.contains("dark")) {
                html.classList.add("dark");
            }
        }
    })
}

document$.subscribe(function() {
    const tables = document.querySelectorAll("table");
    tables.forEach(function(table) {
        const dataTable = new DataTable(table, {
            ordering: false,
            paging: false,
            autoWidth: true,
            fixedHeader: true
        })

        document.querySelectorAll("a.toggle-vis").forEach((el) => {
            el.addEventListener('click', function (e) {
                e.preventDefault();

                let columnIdx = el.getAttribute("data-column");
                let column = dataTable.column(columnIdx);
                let isColVisible = column.visible();

                // Toggle the visibility of the column
                column.visible(!isColVisible);
                // Toggle the highlighting of the button
                if (el.classList.contains("md-button-column-visible")) {
                    el.classList.remove("md-button-column-visible");
                } else {
                    el.classList.add("md-button-column-visible");
                }
            });
        });

        // Toggle on the visible buttons
        document.querySelectorAll(".md-button.toggle-vis").forEach((el) => {
            if (parseInt(el.getAttribute("data-column")) < 4) {
                el.classList.add("md-button-column-visible");
            }
        });

        // Toggle on the visible columns
        let numCols = dataTable.columns().nodes().length;
        if (numCols >= 4) {
            for (let i = 4; i < numCols; i++) {
                let column = dataTable.column(i);
                column.visible(false);
            }
        }
    })
})
