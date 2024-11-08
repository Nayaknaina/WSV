const express = require('express')
const router = express.Router()
const { isAdminLoggedIn, checkSubscription } = require("../middilware/middilware");
const logIncollection = require("../models/admin.model");
const leadsModel = require("../models/leads.model");
const memberModel = require("../models/member.model");
const remarkModel = require("../models/remark.model");
const templateModel = require("../models/temlate.model");
const waModel = require("../models/wA.model");
// const sendMessageToLead = require('./whatsapp')

