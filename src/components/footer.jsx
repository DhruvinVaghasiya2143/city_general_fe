import React from "react";
import {
  Box,
  Grid,
  Typography,
  IconButton,
  TextField,
  Button,
  Link as MuiLink,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CallIcon from "@mui/icons-material/Call";
import MailIcon from "@mui/icons-material/Mail";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

function Footer() {
  return (
    <footer>
      <Box
        component="footer"
        className="w-full bg-[#0b1120] text-slate-400 pt-16 pb-8 border-t border-slate-800"
      >
        {/* Tailwind Width Control */}
        <div className="max-w-7xl mx-auto px-6 ">
          <Grid container spacing={6} justifyContent="space-around">
            {/* Column 1 */}
            <Grid item xs={12} md={6} lg={3}>
              <div className="flex items-center mb-4">
                <LocalHospitalIcon sx={{ color: "white", mr: 1 }} />
                <Typography variant="h6" className="text-white font-bold">
                  CityGeneral
                </Typography>
              </div>

              <Typography variant="body2" className="leading-7 max-w-75">
                Dedicated to providing premium medical services through
                innovation, compassion, and expertise. Your partner in health
                since 1984.
              </Typography>

              <div className="flex gap-3 mt-6 ">
                {[FacebookIcon, TwitterIcon, InstagramIcon].map(
                  (Icon, index) => (
                    <IconButton
                      key={index}
                      className="bg-slate-800 text-white hover:bg-blue-600"
                    >
                      <Icon fontSize="small" className="text-white" />
                    </IconButton>
                  ),
                )}
              </div>
            </Grid>

            {/* Column 2 */}
            <Grid item xs={12} md={6} lg={3}>
              <Typography className="text-white font-semibold mb-6">
                Quick Links
              </Typography>

              <div className="space-y-3">
                {[
                  { label: "Our Doctors", path: "/doctors" },
                  { label: "Specialties", path: "/services" },
                  // { label: "Patient Stories", path: "#" },
                  // { label: "Careers", path: "#" },
                  // { label: "Privacy Policy", path: "#" },
                ].map((item) => (
                  <MuiLink
                    key={item.label}
                    component={RouterLink}
                    to={item.path}
                    onClick={() => window.scrollTo(0, 0)}
                    underline="none"
                    className="block hover:text-white py-1"
                    color="inherit"
                  >
                    {item.label}
                  </MuiLink>
                ))}
              </div>
            </Grid>

            {/* Column 3 */}
            <Grid item xs={12} md={6} lg={3}>
              <Typography className="text-white font-semibold mb-6">
                Contact Info
              </Typography>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <LocationOnIcon sx={{ color: "#3b82f6" }} />
                  <Typography variant="body2">
                    123 Medical Boulevard <br />
                    Healthcare District, NY 10001
                  </Typography>
                </div>

                <div className="flex gap-3">
                  <CallIcon sx={{ color: "#3b82f6" }} />
                  <Typography variant="body2">
                    Emergency: 911 <br />
                    Inquiry: (555) 123-4567
                  </Typography>
                </div>

                <div className="flex gap-3">
                  <MailIcon sx={{ color: "#3b82f6" }} />
                  <Typography variant="body2">info@citygeneral.com</Typography>
                </div>
              </div>
            </Grid>

            {/* Column 4 */}
            {/* <Grid item xs={12} md={6} lg={3}>
              <Typography className="text-white font-semibold mb-6 ">
                Newsletter
              </Typography>

              <Typography variant="body2" className="mb-4 py-2.5">
                Subscribe for health tips and updates.
              </Typography>

              <TextField
                fullWidth
                size="small"
                placeholder="Email address"
                variant="outlined"
                className="my-2.5!"
                sx={{
                  backgroundColor: "#1e293b",
                  borderRadius: 2,
                  input: { color: "white" },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#334155",
                  },
                }}
              />

              <Button
                fullWidth
                variant="contained"
                className="mt-2.5! bg-blue-600 hover:bg-blue-700 font-semibold"
              >
                Subscribe
              </Button>
            </Grid> */}
          </Grid>

          {/* Bottom Bar */}
          <div className="border-t border-slate-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <Typography variant="caption">
              © 2024 CityGeneral Hospital. All rights reserved.
            </Typography>

            <div className="flex gap-6">
              {["Terms of Service", "HIPAA Compliance", "Sitemap"].map(
                (item) => (
                  <MuiLink
                    key={item}
                    href="#"
                    underline="none"
                    color="inherit"
                    className="hover:text-white"
                  >
                    {item}
                  </MuiLink>
                ),
              )}
            </div>
          </div>
        </div>
      </Box>
    </footer>
  );
}

export default Footer;
