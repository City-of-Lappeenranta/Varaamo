import { Factory } from 'rosie';

const Image = new Factory()
  .sequence('url', index => `http://localhost:8004/resource_image/${index}`)
  .attr('type', 'main')
  .sequence('caption', index => `Caption for Image #${index}`);

export default Image;
