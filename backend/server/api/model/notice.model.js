import mongoose from 'mongoose';

const noticeSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      default:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fprofile-image&psig=AOvVaw3zOO9KllcQSEzGgITqAeRJ&ust=1711282179641000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCNCEjYWtioUDFQAAAAAdAAAAABAE",
    },
    category: {
      type: String,
      default: 'uncategorized',
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
{ timestamps: true }
);

const Notice = mongoose.model('Notice', noticeSchema);

export default Notice;