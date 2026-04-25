import postService from "../services/postService.js";
import userRepository from "../repositories/userRepository.js";

class PostController {

    async create(req, res) {
        try {
            const { userId } = req.body;

            if (!userId) throw new Error("userId es requerido");

            await postService.createPost(userId, req.body);

            res.redirect("/posts");
        } catch (error) {
            res.status(400).send(error.message);
        }
    }

    async getAll(req, res) {
        try {
            const posts = await postService.getPosts();
            res.render("posts", { posts });
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    async showCreateForm(req, res) {
        try {
            const users = await userRepository.findAll(); // 🔥 CLAVE
            res.render("create", { users });
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    async showEditForm(req, res) {
        try {
            const post = await postService.getPostById(req.params.id);

            if (!post) return res.status(404).send("Post no encontrado");

            const users = await userRepository.findAll(); // opcional pero PRO
            res.render("edit", { post, users });

        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    async update(req, res) {
        try {
            await postService.updatePost(req.params.id, req.body);
            res.redirect("/posts");
        } catch (error) {
            res.status(400).send(error.message);
        }
    }

    async delete(req, res) {
        try {
            await postService.deletePost(req.params.id);
            res.redirect("/posts");
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
}

export default new PostController();