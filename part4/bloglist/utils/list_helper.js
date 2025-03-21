const dummy = (blogs) => {
  return 1;
};


function totalLikes(blogs) {
  return blogs[0].likes;
}

module.exports = {
  dummy,
  totalLikes,
};
