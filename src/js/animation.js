import { SVG, Timeline } from '@svgdotjs/svg.js';
import axios from 'axios';

const animation = () => {
	const draw = SVG().addTo('#svg');
	// draw.size('100%', '100%');
	draw.attr('id', 'parent');
	draw.attr('viewBox', '0 0 1147.33 899.7');

	axios.get('assets/workspace.svg')
		.then(({data}) => {
			draw.svg(data);
			draw.findOne('svg#parent > svg').attr({
				id: 'container',
			});
			animateDots(draw);
		})
		.catch(err => console.log(err));

};

const animateDots = (draw) => {
	const timeline = new Timeline().persist(true);

	let dot1 = draw.find('#dot1');
	let dot2 = draw.find('#dot2');
	let dot3 = draw.find('#dot3');

	dot1.timeline(timeline);
	dot2.timeline(timeline);
	dot3.timeline(timeline);

	dot1.animate({
		duration: 2000,
		when: 'now',
		delay: 0
	}).attr({ opacity: 0.1})
		.animate({
			duration: 2000,
		})
		.attr({ opacity: 1});

	dot2.animate({
		duration: 2000,
		when: 'after'
	}).attr({ opacity: '0.1'})
		.animate({
			duration: 2000,
			when: 'after'
		})
		.attr({ opacity: 1});

	dot3.animate({
		duration: 2000,
		when: 'after'
	}).attr({ opacity: '0.1'})
		.animate({
			duration: 2000,
			when: 'after'
		})
		.attr({ opacity: 1})
		.after(() => timeline.stop().play());
};

export { animation };
