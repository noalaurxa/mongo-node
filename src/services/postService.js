import postRepository from "../repositories/postRepository.js";
import userRepository from "../repositories/userRepository.js";

class PostService {

    async createPost(userId, postData) {
        const user = await userRepository.findById(userId);
        if (!user) throw new Error("Usuario no encontrado");

        return await postRepository.create({
            ...postData,
            user: user._id,
            hashtags: this.formatHashtags(postData.hashtags)
        });
    }

    async getPosts() {
        return await postRepository.findAll();
    }

    async getPostsByUser(userId) {
        return await postRepository.findByUser(userId);
    }

    async getPostById(postId) {
        const post = await postRepository.findById(postId);
        if (!post) throw new Error("Post no encontrado");
        return post;
    }

    async updatePost(postId, postData) {
        return await postRepository.update(postId, {
            ...postData,
            hashtags: this.formatHashtags(postData.hashtags)
        });
    }

    async deletePost(postId) {
        return await postRepository.delete(postId);
    }

    // 🔥 Convierte "#tag1,#tag2" → ["tag1","tag2"]
    formatHashtags(hashtags) {
        if (!hashtags) return [];

        if (Array.isArray(hashtags)) return hashtags;

        return hashtags
            .split(",")
            .map(tag => tag.trim().replace("#", ""))
            .filter(tag => tag.length > 0);
    }
}

export default new PostService();