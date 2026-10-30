import { store } from '../data/store.js';

export const getUserCertificates = (req, res) => {
  try {
    const userId = req.query.userId || req.user?.id || 'usr_01';
    const certs = store.getCertificates(userId);
    res.json({ success: true, count: certs.length, certificates: certs });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const verifyCertificate = (req, res) => {
  try {
    const { code } = req.params;
    const cert = store.getCertificateById(code);
    if (!cert) {
      return res.status(404).json({ success: false, message: 'Certificate verification failed: Invalid or expired certificate code' });
    }
    res.json({
      success: true,
      verified: true,
      certificate: cert
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

