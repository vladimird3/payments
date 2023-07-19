class HealthController {

  async health (req, res, next) {
    console.log("health");
    const data = {
      uptime: process.uptime(),
      message: 'Ok',
      date: new Date()
    }

    res.status(200).send(data);
  }
}

module.exports = new HealthController();