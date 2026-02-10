import videoModel from '../models/videoModel.js';


const addVideo = async (req, res) => {
    try {
        const { name, link, category } = req.body;

        /* ===== VALIDATIONS ===== */
        if (!name || !link || !category) {
            return res.json({
                success: false,
                message: "Name, video link and category are required",
            });
        }

        if (name.length < 3) {
            return res.json({
                success: false,
                message: "Video name must be at least 3 characters long",
            });
        }

        // Basic URL validation
        let parsedUrl;
        try {
            parsedUrl = new URL(link);
        } catch {
            return res.json({
                success: false,
                message: "Invalid video link",
            });
        }

        /* ===== SAVE VIDEO ===== */
        const video = new videoModel({
            name,
            link,
            category,
        });

        await video.save();

        return res.json({
            success: true,
            message: "Video added successfully",
        });
    } catch (error) {
        console.error("ADD VIDEO ERROR:", error);
        return res.json({
            success: false,
            message: "Internal server error",
        });
    }
};

const videoList = async (req, res) => {
  try {
    const videos = await videoModel
      .find()
      .sort({ createdAt: -1 });

    return res.json({
      success: true,
      data: videos,
    });
  } catch (error) {
    console.error("VIDEO LIST ERROR:", error);
    return res.json({
      success: false,
      message: "Internal server error",
    });
  }
};

const videoDelete = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.json({
        success: false,
        message: "Video ID is required",
      });
    }

    const video = await videoModel.findById(id);

    if (!video) {
      return res.json({
        success: false,
        message: "Video not found",
      });
    }

    await videoModel.findByIdAndDelete(id);

    return res.json({
      success: true,
      message: "Video deleted successfully",
    });
  } catch (error) {
    console.error("DELETE VIDEO ERROR:", error);
    return res.json({
      success: false,
      message: "Internal server error",
    });
  }
};

export { addVideo, videoList, videoDelete };