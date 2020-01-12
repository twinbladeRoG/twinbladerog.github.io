import { SVG, Timeline } from '@svgdotjs/svg.js';
import axios from 'axios';

const animation = () => {
	const draw = SVG().addTo('#svg');
	draw.attr('id', 'parent');
	draw.attr('viewBox', '0 0 1147.33 899.7');

	axios.get('assets/workspace.svg')
		.then(({data}) => {
			draw.svg(data);
			draw.findOne('svg#parent > svg').attr({
				id: 'container',
				viewBox: '0 0 1147.33 899.7'
			});
			animateDots(draw);
			animateAngles(draw);
			typeCode(draw);
		})
		.catch(err => console.log(err));

};

const animateDots = (draw) => {
	const timeline = new Timeline().persist(true);

	const dot1 = draw.find('#dot1');
	const dot2 = draw.find('#dot2');
	const dot3 = draw.find('#dot3');

	dot1.timeline(timeline);
	dot2.timeline(timeline);
	dot3.timeline(timeline);

	dot1.animate({
		duration: 1000, when: 'now', delay: 0
	}).attr({ opacity: 0});
	dot2.animate({
		duration: 1000, when: 'after'
	}).attr({ opacity: 0});
	dot3.animate({
		duration: 1000, when: 'after'
	}).attr({ opacity: 0});

	dot3.animate({
		duration: 1000, when: 'after'
	}).attr({ opacity: 1});
	dot2.animate({
		duration: 1000, when: 'after'
	}).attr({ opacity: 1});
	dot1.animate({
		duration: 1000, when: 'after'
	}).attr({ opacity: 1}).after(() => timeline.stop().play());
};

const animateAngles = draw => {
	const timeline = new Timeline().persist(true);

	const langle = draw.find('#left-bracket');
	const rangle = draw.find('#right-bracket');
	const slash = draw.find('#mid-slash');

	langle.timeline(timeline);
	rangle.timeline(timeline);
	slash.timeline(timeline);

	langle.attr({ opacity: 0});
	rangle.attr({ opacity: 0});
	slash.attr({ opacity: 0});

	langle.animate({
		duration: 1000,
		delay: 1000
	}).attr({ opacity: 1 });

	rangle.animate({
		duration: 1000
	}).attr({ opacity: 1 });

	slash.animate({
		duration: 1000
	}).attr({ opacity: 1 });

	langle.animate({
		duration: 1000
	}).transform({ translateX: -10, translateY: -10 });

	rangle.animate({
		duration: 1000
	}).transform({ translateX: 10, translateY: 10 });

	slash.animate({ duration: 2000 })
		.transform({ rotate: 180 })
		.animate({ duration: 2000 })
		.transform({ rotate: 0 })
		.after(() => timeline.stop().play());
};

const typeCode = (draw) => {
	const text = draw.find('text');
	text.build(true);
};

export { animation };
