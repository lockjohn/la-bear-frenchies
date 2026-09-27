(function () {
  "use strict";

  function fetchContent(path) {
    return fetch(path, { cache: "no-cache" }).then(function (response) {
      if (!response.ok) {
        throw new Error("Unable to load " + path + " (" + response.status + ")");
      }
      return response.json();
    });
  }

  function setImage(selector, item) {
    var image = document.querySelector(selector);
    if (!image || !item || !item.image) return;
    image.src = item.image;
    image.alt = item.alt || "";
  }

  function renderGallery(name, items, wrapInCard) {
    var gallery = document.querySelector('[data-home-gallery="' + name + '"]');
    if (!gallery || !Array.isArray(items)) return;

    Array.from(gallery.children).forEach(function (item) {
      var isGalleryItem = item.hasAttribute("data-cms-item") ||
        (wrapInCard && item.classList.contains("card")) ||
        (!wrapInCard && item.tagName === "IMG");
      if (isGalleryItem) item.remove();
    });

    items.forEach(function (item) {
      if (!item || !item.image) return;
      var image = document.createElement("img");
      image.src = item.image;
      image.alt = item.alt || "";
      image.loading = "lazy";
      image.decoding = "async";

      if (wrapInCard) {
        var card = document.createElement("div");
        card.className = "card";
        card.dataset.cmsItem = "";
        card.appendChild(image);
        gallery.appendChild(card);
      } else {
        image.dataset.cmsItem = "";
        gallery.appendChild(image);
      }
    });
  }

  function loadHomePage() {
    fetchContent("content/home.json")
      .then(function (content) {
        setImage('[data-home-image="intro"]', content.intro_image);

        var features = content.feature_images || {};
        Object.keys(features).forEach(function (key) {
          setImage('[data-home-image="' + key + '"]', features[key]);
        });

        renderGallery("mamas", content.mamas, true);
        renderGallery("happy_homes", content.happy_homes, false);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  function renderPuppyCard(puppy) {
    var card = document.createElement("article");
    card.className = "card puppy available-puppy";

    var heading = document.createElement("h2");
    heading.textContent = puppy.header || "Available puppy";
    card.appendChild(heading);

    (puppy.photos || []).forEach(function (photo) {
      if (!photo) return;
      var image = document.createElement("img");
      image.src = photo;
      image.alt = puppy.header || "Available French Bulldog puppy";
      image.loading = "lazy";
      image.decoding = "async";
      card.appendChild(image);
    });

    if (puppy.description) {
      var description = document.createElement("p");
      description.className = "cms-rich-text";
      description.textContent = puppy.description;
      card.appendChild(description);
    }

    return card;
  }

  function loadPuppiesPage() {
    fetchContent("content/puppies.json")
      .then(function (content) {
        var heading = document.querySelector("[data-puppies-heading]");
        var description = document.querySelector("[data-puppies-description]");
        var grid = document.querySelector("[data-available-puppies]");

        if (heading && content.heading) heading.textContent = content.heading;
        if (description) description.textContent = content.description || "";
        if (!grid) return;

        grid.replaceChildren();
        (content.puppies || [])
          .filter(function (puppy) { return puppy && puppy.show !== false; })
          .forEach(function (puppy) {
            grid.appendChild(renderPuppyCard(puppy));
          });
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  function initializeContent() {
    if (document.body.dataset.page === "home") loadHomePage();
    if (document.body.dataset.page === "puppies") loadPuppiesPage();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeContent);
  } else {
    initializeContent();
  }
})();
