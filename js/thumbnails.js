'use strict';

const initPage = () => {

  // for getDetails.php
  const renderDetails = (itemID, description) => {    
    const detailsPane = document.querySelector('#detailsPane');

    detailsPane.querySelector('img').src = `images/${itemID}-detail.jpg`;
    detailsPane.querySelector('#description').innerHTML = `<p>${description}</p>`;
  }

  // for getDetailsCSV.php: comma seperated values
  const renderDetailsCSV = (csv) => {
    csv = csv.split(',');
    const description = {
      itemID: csv[0],
      details: csv[1],
      price: csv[2],
      URLs: csv.slice(3)
    }

    const details = document.createElement('p');
    details.innerHTML = `${description.details}`;

    const price = document.createElement('p');
    price.innerHTML = `<b>Price: ${description.price}<b>`;

    const links = document.createElement('ul');
    description.URLs.map(function(link) {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = link;
      a.innerText = link;
      li.append(a);
      links.append(li);
    });

    const detailsPane = document.querySelector('#detailsPane');
    detailsPane.querySelector('img').src = `images/${description.itemID}-detail.jpg`;
    detailsPane.querySelector('#description').innerHTML = '';
    detailsPane.querySelector('#description').append(details);
    detailsPane.querySelector('#description').append(price);
    detailsPane.querySelector('#description').append(links);
  }

  // for getDetailsXML.php: comma seperated values
  const renderDetailsXML = (xml) => {
    // collect data
    const data = {
      itemID: xml.querySelector('item').id,
      description: xml.querySelector('description').textContent,
      price: xml.querySelector('price').textContent,
      URLs: []
    }
    Array.from(xml.querySelector('resources').children).map(url => data.URLs.push(url.textContent));

    // create DOM Element
    const description = document.createElement('p');
    description.textContent = `${data.description}`;

    const price = document.createElement('p');
    price.innerHTML = `<b>Price: ${data.price}<b>`;

    const links = document.createElement('ul');
    data.URLs.map(function(link) {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = link;
      a.innerText = link;
      li.append(a);
      links.append(li);
    });

    // add the DOM Element
    const detailsPane = document.querySelector('#detailsPane');
    detailsPane.querySelector('img').src = `images/${data.itemID}-detail.jpg`;
    detailsPane.querySelector('#description').innerHTML = '';
    detailsPane.querySelector('#description').append(description);
    detailsPane.querySelector('#description').append(price);
    detailsPane.querySelector('#description').append(links);
  }

  const renderDetailsXMLUpdated = (xml) => {
    console.log(xml);
  }

  const thumbnailPaneOnClickHandler = (event) => {
    if (event.target.tagName === 'IMG') {
      const itemID = event.target.id;

      let request = new XMLHttpRequest();
      request.addEventListener('readystatechange', function() {
        if (request.readyState === 4 && request.status === 200) {
          // renderDetails(itemID, request.responseText);
          // renderDetailsCSV(request.responseText);
          renderDetailsXML(request.responseXML);
          // renderDetailsXMLUpdated(request.responseXML);
        }
      })

      // getDetails.php | Regular String
      // request.open('GET', `getDetails.php?ImageID=${itemID}`);

      // getDetailsCSV.php | Regular String, but with inner logic
      // request.open('GET', `getDetailsCSV.php?ImageID=${itemID}`);

      // getDetailsXML.php | XML tree
      request.open('GET', `getDetailsXML.php?ImageID=${itemID}`);

      // getDetailsXml-updated.php | XML tree, but better structured
      // request.open('GET', `getDetailsXML-updated.php?ImageID=${itemID}`);

      request.send();
    }
  }

  // Main Logic

  const thumbnailPane = document.querySelector('#thumbnailPane');
  thumbnailPane.addEventListener('click', thumbnailPaneOnClickHandler);
}

window.addEventListener('load', initPage);
