import { type Request } from 'express';
import geoip from 'geoip-lite';

/**
 * Strips the IPv6 prefix from the IPv4 address.
 * Mostly used for local development.
 *
 * @param {Request} req - The Express request object.
 * @returns {string} - The stripped IP address.
 */
export function getStrippedIp(req: Request) {
  let ip = req.ip;
  if (ip?.startsWith('::ffff:')) {
    ip = ip.substring(7);
  }
  return ip;
}

/**
 * Geolocates an IP address.
 * Used for logging and analytics.
 *
 * @param {string} ip - The IP address to geolocate.
 * @returns {object} - The geolocation data.
 */
export function geolocate(ip: string) {
  const geo = geoip.lookup(ip);

  if (!geo) {
    return {
      country: 'Unknown',
      location: 'Unknown'
    };
  }

  return {
    country: geo.country,
    location: geo.city || geo.region || 'Unknown'
  };
}
