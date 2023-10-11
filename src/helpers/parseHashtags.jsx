export const parseHashtags = (text) => {
  const hashtagRegex = /#(\w+)/g;
  return text.split(hashtagRegex).map((part, index) => {
    if (part.match(hashtagRegex)) {
      // If it's a hashtag, create a link
      const hashtag = part.substring(1); // Remove the '#' character
      return (
        <Link to={`/hashtags/${hashtag}`} key={index}>
          {part}
        </Link>
      );
    } else {
      // If it's regular text, display it as is
      return part;
    }
  });
};

export default parseHashtags;
