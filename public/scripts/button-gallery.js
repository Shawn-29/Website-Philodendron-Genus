let smgImgContainer = null;
let selectedThumb = null;
let photoGallery = null;

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

const thumbClicked = (e) => {
	e.preventDefault();
	const thumbnail = e.target;
	if (thumbnail.classList.contains('thumbnail') &&
		thumbnail !== selectedThumb) {
		setSelected(thumbnail);
	}
}

(() => {
	photoGallery = document.getElementById("js-photo-gallery");

	if (photoGallery) {

		document.getElementById("no-js-photo-gallery")?.classList.add("hidden");

		photoGallery.classList.remove("hidden");

		photoGallery.addEventListener('click', thumbClicked);

		/* set the intitially selected gallery thumbnail */
		const thumb = document.querySelector('.thumbnail');
		if (thumb) {
			setSelected(thumb);
		}
	}
})();