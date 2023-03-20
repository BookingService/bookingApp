import { Flat } from "../models/Flat.js";
import { ERROR_MESSAGES } from "../utils/messages.js";
import { getCoordinatesForAddress } from "../middleware/getCoordinates.js";
import { Review } from "../models/Review.js";
import { User } from "../models/User.js";
import { upload } from "../middleware/multerMiddleware.js";
import { transformToDotNotation } from "../middleware/transformToDotNotation.js";
import { getImageUrl } from "../middleware/getImageUrl.js";

export class FlatController {
  async getFlats(req, res) {
    try {
      const {
        searchQuery,
        minPrice,
        maxPrice,
        isAllowToSmoke,
        isParkingAvailable,
        withAnimals,
        withKids,
        maxGuests,
      } = req.query;
      const filters = {};
      const requirements = {};
      if (searchQuery?.length) {
        filters.title = {
          $options: "i",
          $regex: searchQuery,
        };
      }
      if (Number(minPrice)) {
        filters.pricePerNight = {
          $gte: Number(minPrice),
        };
      }
      if (Number(maxPrice)) {
        filters.pricePerNight = {
          $lte: Number(maxPrice),
        };
      }
      if (isAllowToSmoke) {
        requirements.isAllowToSmoke = isAllowToSmoke;
      }
      if (isParkingAvailable) {
        requirements.isParkingAvailable = isParkingAvailable;
      }
      if (withAnimals) {
        requirements.withAnimals = withAnimals;
      }
      if (withKids) {
        requirements.withKids = withKids;
      }
      if (Number(maxGuests)) {
        requirements.maxGuests = {
          $lte: Number(maxGuests),
        };
      }
      const transformedObjectForRequirementFilter = transformToDotNotation({
        requirements,
      });

      const flats = await Flat.find({
        ...filters,
        ...transformedObjectForRequirementFilter,
      }).populate("host reviews");
      res.json(flats);
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: e.message });
    }
  }
  async getFlatById(req, res) {
    try {
      const { id } = req.params;
      const flat = await Flat.findById(id).populate("reviews");
      if (!flat) {
        return res.status(404).json({ message: ERROR_MESSAGES.flat_not_found });
      }
      return res.json(flat);
    } catch (e) {
      console.log(e.message);
      res.status(500).json({ message: ERROR_MESSAGES.server_error });
    }
  }
  async deleteFlatById(req, res) {
    try {
      const { id } = req.params;
      const flat = await Flat.findByIdAndDelete(id);
      if (!flat) {
        return res.status(404).json({ message: ERROR_MESSAGES.flat_not_found });
      }
      return res.status(204).json();
    } catch (e) {
      console.log(e.message);
      res.status(500).json({ message: ERROR_MESSAGES.server_error });
    }
  }
  async createFlat(req, res) {
    try {
      const {
        title,
        description,
        pricePerNight,
        requirements,
        amenities,
        address,
        hostId,
        imagesUrls,
      } = req.body;
      if (!title || !description || !pricePerNight || !address || !hostId) {
        return res
          .status(400)
          .json({ message: ERROR_MESSAGES.invalid_request });
      }
      const { longitude, latitude } = await getCoordinatesForAddress(address);
      const location = {
        type: "Point",
        coordinates: [latitude, longitude],
      };
      if (!requirements.isAllowToSmoke) {
        requirements.isAllowToSmoke = false;
      }
      if (!requirements.withKids) {
        requirements.withKids = false;
      }
      if (!requirements.withAnimals) {
        requirements.withAnimals = false;
      }
      if (!requirements.isParkingAvailable) {
        requirements.isParkingAvailable = false;
      }
      const newFlat = await Flat.create({
        title,
        description,
        pricePerNight,
        requirements,
        host: hostId,
        address,
        location,
        amenities,
        imagesUrls,
      });
      const savedFlat = await Flat.findById(newFlat._id).populate("host");

      return res.status(201).json(savedFlat);
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: e.message });
    }
  }
  async uploadImage(req, res) {
    upload.array("images", 5)(req, res, (err) => {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .json({ message: ERROR_MESSAGES.invalid_upload_image });
      }
      const fileNames = req.files.map((file) => file.filename);
      return res.status(200).json({
        urls: fileNames.map((fileName) => getImageUrl(fileName)),
      });
    });
  }
}
