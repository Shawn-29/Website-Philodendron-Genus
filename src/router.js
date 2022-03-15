const router = require('express').Router();
const {
    homeController,
    guideController,
    formController,
    plantListController,
    articleController,
    notFoundController
} = require('./controllers');

const RateLimitError = require('./errors/rate-limit-error');

router.use('/', require('express-rate-limit')({
    windowMs: 60000,
    max: 120,
    legacyHeaders: false,
    handler() {
        throw new RateLimitError({ message: 'Too many requests sent to server' });
    }
}));

router.get('/', homeController);
router.get('/growing-guide', guideController);
router.get('/form', formController);
router.get('/plant-list', plantListController);
router.get('/article/:id', articleController);

router.use(notFoundController);


module.exports = router;