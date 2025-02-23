import { findNextAvailablePort } from '../utils/portUtils';
import { EventEmitter } from 'events';

export class PortManager extends EventEmitter {
  private static instance: PortManager;
  private activePorts: Map<number, boolean>;

  private constructor() {
    super();
    this.activePorts = new Map();
  }

  public static getInstance(): PortManager {
    if (!PortManager.instance) {
      PortManager.instance = new PortManager();
    }
    return PortManager.instance;
  }

  /**
   * Allocates a port starting from the desired port
   * @param desiredPort The preferred port to start checking from
   * @returns Promise resolving to allocated port number or null if no ports available
   */
  public async allocatePort(desiredPort: number): Promise<number | null> {
    const port = await findNextAvailablePort(desiredPort);
    
    if (port) {
      this.activePorts.set(port, true);
      this.emit('port-allocated', port);
      return port;
    }
    
    return null;
  }

  /**
   * Releases an allocated port
   * @param port Port number to release
   */
  public releasePort(port: number): void {
    if (this.activePorts.has(port)) {
      this.activePorts.delete(port);
      this.emit('port-released', port);
    }
  }

  /**
   * Gets all currently active ports
   * @returns Array of active port numbers
   */
  public getActivePorts(): number[] {
    return Array.from(this.activePorts.keys());
  }
} 