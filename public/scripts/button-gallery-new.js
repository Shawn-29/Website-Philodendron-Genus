(() => {

    let selectedThumb = null;

    const setSelected = (elem) => {
        if (selectedThumb) {
            selectedThumb.classList.remove('selected');
        }
    
        selectedThumb = elem;
    
        elem.classList.add('selected');
    
        const largeImg = document.getElementById('gallery-large-img');
        if (largeImg) {
            largeImg.src = selectedThumb.src;
        }
    };

    const changeImg = e => {
        e.preventDefault();
        const target = e.target;
        if (target !== e.currentTarget &&
            target.classList.contains('thumbnail')) {

            setSelected(target);
        }
    };

    const thumbnailContainer = document.getElementById('gallery-thumbnail-container');
    if (thumbnailContainer) {
        thumbnailContainer.classList.remove('hidden');
        thumbnailContainer.addEventListener('click', changeImg);

		/* set the intitially selected gallery thumbnail */
		const thumb = document.querySelector('.thumbnail');
		if (thumb) {
			setSelected(thumb);
		}
    }

})();