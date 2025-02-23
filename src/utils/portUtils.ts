import net from 'net';

/**
 * Checks if a port is available
 * @param port Port number to check
 * @returns Promise that resolves to boolean indicating if port is available
 */
export const isPortAvailable = (port: number): Promise<boolean> => {
  return new Promise((resolve) => {
    const server = net.createServer()
      .once('error', () => {
        resolve(false);
      })
      .once('listening', () => {
        server.close();
        resolve(true);
      })
      .listen(port);
  });
};

/**
 * Finds the next available port starting from the given port
 * @param startPort Starting port number
 * @param maxAttempts Maximum number of ports to check (default: 100)
 * @returns Promise that resolves to the next available port or null if none found
 */
export const findNextAvailablePort = async (
  startPort: number,
  maxAttempts: number = 100
): Promise<number | null> => {
  for (let port = startPort; port < startPort + maxAttempts; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  return null;
}; 