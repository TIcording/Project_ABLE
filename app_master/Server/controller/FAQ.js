import * as faqRepository from '../data/FAQ.js';

export async function getFAQ(req, res) {
    const faq = req.myFAQ;
    const data = await (
        faqRepository.findAllFAQ(faq)
        );
    res.status(200).json(data);
};