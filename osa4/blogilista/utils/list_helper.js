let ld = require('lodash');
const { help } = require('yargs');

const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => {
  let count = 0
  blogs.forEach(element => {count +=element.likes});
  return count
}

const favoriteBlog = (blogs) => {
  results = blogs.map(element => {return element.likes})
  let max = Math.max(...results)
  let results1 = blogs.filter(element => {return element.likes === max})
  return results1[0]
}

const mostBlogs = (blogs) => {
  const helper_array = []
  let obj = ld.countBy(blogs, (blog) => {
    return blog.author;
  });
    let author = Object.keys(obj).reduce((a, b) => obj[a] > obj[b] ? a : b);
    for (let key in obj){
      helper_array.push(
        {
          'author': key,
          'blogs': obj[key]
        }
      )
    }
    return helper_array.filter(element => element.author === author)[0]
}

const mostLikes = (blogs) => {
  const helper_array = {}
  let authorsnlikes = blogs.map(blog => {return {'author': blog.author,'likes': blog.likes}})
  authorsnlikes.forEach(element =>{
    if (helper_array[element.author] === undefined) {
      helper_array[element.author] = element.likes
    } else {
      helper_array[element.author] += element.likes
    }
 })
 let author = Object.keys(helper_array).reduce((a, b) => helper_array[a] > helper_array[b] ? a : b);
 return {
   'author': author,
   'likes': helper_array[author]
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}